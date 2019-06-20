const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callBack => {
  MongoClient.connect(
    "mongodb+srv://jshreyans:node-shop@node-shop-oiwo8.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log("<<<<<");
      console.log("------------ CONNECTED -----------");
      console.log(">>>>>");
      _db = client.db();
      callBack();
    })
    .catch(err => {
      console.log("ERROR - Could not connect to MongoDB");
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
