const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
// const User = require("./models/users.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("5cf740650b47b442d87d7dfe")
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoose instance
mongoose
  .connect(
    "mongodb+srv://jshreyans:" +
      process.env.MONGO_ATLAS_PW +
      "@node-shop-oiwo8.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  )
  .then(result => {
    console.log("<<<<<");
    console.log("------------ CONNECTED -----------");
    console.log(">>>>>");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
