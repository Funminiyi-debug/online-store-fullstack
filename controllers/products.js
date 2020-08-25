const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Products");
const fs = require("fs");
const path = require("path");

exports.getProduct = async (req, res) => {
  // should be get category
  res.json({ msg: "get product singular working" });
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    let product = await Product.find().sort({ category: 1 });
    if (product.length === 0) {
      res.status(404).json({ msg: "products not found" });
    } else {
      res.status(200).json({ msg: "Success", product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE PRODUCTS
exports.updateProduct = async (req, res) => {
  const conditions =
    !req.body.name ||
    !req.body.price ||
    !req.file.image ||
    !req.body.category ||
    !req.body.subcategory;
  if (conditions) {
    return res.status(403).json({
      msg: "contents cannot be empty",
    });
  }

  try {
    let product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name: req.body.name,
        price: req.body.price,
        image: {
          name: `../uploads/${req.file.filename}`,
          data: fs.readFileSync(
            path.resolve(__dirname, "../uploads/" + req.file.filename)
          ),
        },
        category: req.body.category,
        subcategory: req.body.subcategory,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        msg: "product not found with id" + req.params.productId,
      });
    }
    return res.status(200).json({ msg: "Success", product: product });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "product not found with id " + req.params.productId,
      });
    }
    return res.status(500).json({ msg: "Server error" });
  }
};

// POST @resources/products/
// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: {
      name: `../uploads/${req.file.filename}`,
      data: fs.readFileSync(
        path.resolve(__dirname, "../uploads/" + req.file.filename)
      ),

      // to store to database (not advisable)
      contentType: req.file.mimetype,
    },
    category: req.body.category,
    subcategory: req.body.subcategory,
  };

  console.log("this is the newly created product", newProduct);

  // create all data in database

  try {
    let product = await Product.find({ name: newProduct.name });

    if (product.length !== 0) {
      return res.status(200).json({ msg: "product already exist" });
    } else {
      product = await Product.create(newProduct);
      return res.status(200).json({ msg: "Success", product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// console.log(require("./sample"));
