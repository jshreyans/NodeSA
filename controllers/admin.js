const Product = require("../models/product");

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

  const product = new Product(null, title, imgURL, description, price);
  product.save();
  console.log("new product posted");

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  console.log('edit product called')
  // using query parameters
  const editMode = req.query.editing;
  if (!editMode) {
    console.log("failed in getEditProduct: product not found");
    return res.redirect("/");
  }
  const prodID = req.params.productID;
  Product.findById(prodID, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  console.log("editing product!");

  const productID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedimgURL = req.body.imgURL;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    productID,
    updatedTitle,
    updatedimgURL,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  console.log("product edited!");
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
