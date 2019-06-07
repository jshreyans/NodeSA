const Product = require("../models/product");

const ObjectId = require("mongodb").ObjectId;

exports.getAddProduct = (req, res, next) => {
  console.log("add-product called");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("posting new product");
  const title = req.body.title;
  const imgURL = req.body.imgURL;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(
    title,
    imgURL,
    description,
    price,
    null,
    req.user._id
  );
  product
    .save()
    .then(result => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
  // console.log("new product posted");

  // res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        path: "/admin/products",
        pageTitle: "Admin Products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  console.log("edit product called");
  // using query parameters
  const editMode = req.query.editing;
  if (!editMode) {
    console.log("failed in getEditProduct: product not found");
    return res.redirect("/");
  }
  const prodID = req.params.productID;
  Product.findById(prodID)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  console.log("editing product!");

  const productID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedimgURL = req.body.imgURL;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const userId = req.user._id;

  const product = new Product(
    updatedTitle,
    updatedimgURL,
    updatedDescription,
    updatedPrice,
    new ObjectId(productID),
    userId
  );
  product
    .save()
    .then(result => {
      console.log("PRODUCT UPDATED");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
  // updatedProduct.save();
  // console.log("product edited!");
  // res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;
  Product.deleteByID(productID)
    .then(result => {
      console.log("PRODUCT REMOVED");
      res.redirect("admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
