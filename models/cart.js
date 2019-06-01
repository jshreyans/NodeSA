const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  /*
    typical product object required till now:
    product = {
        id: ###,
        qty: ###,
        price: ###
    }
  */
  static addProduct(id, productPrice) {
    // fetch existing cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // check if product already exists
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedproduct;
      // increment count if yes
      if (existingProduct) {
        updatedproduct = { ...existingProduct };
        updatedproduct.qty += 1;
        //update cart
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedproduct;
      }
      // create product if no
      else {
        updatedproduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedproduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.findIndex(prod => prod.id === id);
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    })
  }
};
