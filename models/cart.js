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
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
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
      })
    });
  }
};