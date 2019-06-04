const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

module.exports = class Product {
  constructor(title, imgURL, description, price, id) {
    this.title = title;
    this.imgURL = imgURL;
    this.description = description;
    this.price = price;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbInsertProduct;
    if (this._id) {
      // update product
      db.collection("products").updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: this }
      );
    } else {
      dbInsertProduct = db.collection("products").insertOne(this);
    }
    return dbInsertProduct
      .then(result => {
        console.log("SUCCESS! from product");
        console.log(result);
      })
      .catch(err => {
        console.log("ERROR from product.js");
        console.log(err);
      });
  }

  static fetchAll() {
    const dc = getDb();
    return dc
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log("ERROR from fetchAll method - Product Model");
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// const fs = require("fs");
// const path = require("path");

// const Cart = require('./cart');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imgURL, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imgURL = imgURL;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     getProductsFromFile(products => {
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           prod => prod.id === this.id
//         );
//         console.log("product found");
//         const updatedProducts = [...products];
//         updatedProducts[existingProductIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//           console.log(err);
//         });
//       } else {
//         this.id = Math.random().toString();
//         console.log("new product saved");
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), err => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static deleteByID(id) {
//     getProductsFromFile(products => {
//       const product = products.find(prod => prod.id === id);
//       const updatedProducts = products.filter(prod => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       })
//     });
//   }

//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }

//   static findById(id, cb) {
//     getProductsFromFile(products => {
//       const product = products.find(p => p.id === id);
//       cb(product);
//     });
//   }
// };
