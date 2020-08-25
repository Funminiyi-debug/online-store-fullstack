const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  updateCartItems,
  getCartItems,
} = require("../controllers/user");

router.post("/", getUserDetails);

router.post("/cartItems", updateCartItems);

router.post("/getcartitems", getCartItems);

module.exports = router;
