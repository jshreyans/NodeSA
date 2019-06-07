const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

module.exports = class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
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
