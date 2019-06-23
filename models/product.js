const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  imgURL: {
    type: String,
    required:true
  }
})

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// module.exports = class Product {
//   constructor(title, imgURL, description, price, id, userId) {
//     this.title = title;
//     this.imgURL = imgURL;
//     this.description = description;
//     this.price = price;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbInsertProduct;
//     if (this._id) {
//       // update product
//       dbInsertProduct = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbInsertProduct = db.collection("products").insertOne(this);
//     }
//     return dbInsertProduct
//       .then(result => {
//         console.log("[PRODUCT MODEL] SUCCESS!");
//         console.log(result);
//       })
//       .catch(err => {
//         console.log("[PRODUCT MODEL] ERROR");
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         console.log("[PRODUCT MODEL]", products);
//         return products;
//       })
//       .catch(err => {
//         console.log("[PRODUCT MODEL] ERROR - fetchAll");
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     db.collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(product => {
//         console.log('[PRODUCT MODEL] deleted!');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };

// // const getProductsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// // module.exports = class Product {
// //   constructor(id, title, imgURL, description, price) {
// //     this.id = id;
// //     this.title = title;
// //     this.imgURL = imgURL;
// //     this.description = description;
// //     this.price = price;
// //   }

// //   save() {
// //     getProductsFromFile(products => {
// //       if (this.id) {
// //         const existingProductIndex = products.findIndex(
// //           prod => prod.id === this.id
// //         );
// //         console.log("product found");
// //         const updatedProducts = [...products];
// //         updatedProducts[existingProductIndex] = this;
// //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
// //           console.log(err);
// //         });
// //       } else {
// //         this.id = Math.random().toString();
// //         console.log("new product saved");
// //         products.push(this);
// //         fs.writeFile(p, JSON.stringify(products), err => {
// //           console.log(err);
// //         });
// //       }
// //     });
// //   }
