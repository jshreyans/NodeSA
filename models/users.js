const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    // save new user or update existing user
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(result => {
        console.log("[USER MODEL] Adding user");
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToCart(product) {
    // const db = getDb();
    // let newQuantity = 1;
    // const updatedCartItems = [];
    // updatedCartItems.push({
    //   productID: new mongodb.ObjectId(product._id),
    //   quantity: newQuantity
    // });
    // const updatedCart = { items: updatedCartItems };
    // return db
    //   .collection("users")
    //   .updateOne(
    //     { _id: new mongodb.ObjectId(this._id) },
    //     { $set: { cart: updatedCart } }
    //   );
    const db = getDb();
    // check if product is alredy present
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productID.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productID: new mongodb.ObjectId(product._id),
        quantity: newQuantity
      });
    }
    // new product to be added (cartProduct is false)
    const updatedCart = { items: updatedCartItems };
    return db
      .collection("users")
      .updateOne(
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

  deleteItemFromCart(productID) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productID.toString() !== productID.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return (
      this.getCart() // simply an array of all products
        .then(products => {
          // create an order object to be written to orders collection
          const order = {
            items: products,
            user: {
              _id: new mongodb.ObjectId(this._id),
              name: this.name
            }
          };
          // write order to mongo collection
          return db.collection("orders").insertOne(order);
        })
        // now that order has been checked out, empty the cart
        .then(result => {
          this.cart = { items: [] };
          // cart empty, update the database for that user
          return db
            .collection("users")
            .updateOne(
              { _id: new mongodb.ObjectId(this._id) },
              { $set: { cart: { items: [] } } }
            );
        })
        .catch(err => {
          console.log(err);
        })
    );
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({'user._id': new mongodb.ObjectId(this._id)})
      .toArray();
  }

  static findById(userId) {
    // find user by id
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        console.log("[USER MODEL]", user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
