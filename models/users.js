const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

module.exports = class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    // save new user or update existing user
    const db = getDb;
    db.collection("users")
      .insertOne(this)
      .then(result => {
        console.log("Adding user");
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToCart(product) {
    // check if product is alredy present
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productID.toString() === product._id.toString();
    });

    let quantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productID: new mongodb.ObjectId(product._id),
        quantity: 1
      });
    }
    // new product to be added (cartProduct is false)
    const updatedCart = { items: updatedCartItems };
    const db = getDb;
    db.collection("users").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  getCart() {
    const db = getDb();
    const productiDs = this.cart.items.map(i => {
      return i.productID;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productiDs } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productID.toString() === p._id.toString();
            }).quantity
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
    // return this.cart;
  }

  static findById(userId) {
    // find user by id
    const db = getDb;
    db.collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
