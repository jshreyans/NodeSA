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
    const cartProduct = this.cart.items.findIndex(cp => {
      return cp._id === product._id;
    });
    // new product to be added (cartProduct is false)
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb;
    db.collection("users").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
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
