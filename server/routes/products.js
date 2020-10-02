const express = require("express");
const router = express.Router();
const { Brand } = require("../models/Brand");
const { Product } = require("../models/Product");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const { json } = require("body-parser");

/* ======================
    ======================
//*                        BRAND
    ======================
    ======================
*/
// route    => /api/products/brand
// method   => POST
// access   => private  level 1 => admins only route
router.post("/brand", auth, isAdmin, async (req, res) => {
  try {
    const brand = new Brand(req.body);
    if (!brand)
      return res.status(400).json({ success: false, message: "invalid name" });
    await brand.save();
    res.status(200).json({ success: true, brand });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
});
// route    => /api/products/brand
// method   => GET
// access   => public
router.get("/brand", async (req, res) => {
  const brands = await Brand.find();
  if (!brands) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, brands });
});

/* ==============================
    ==============================
//*                             PRODUCT
    ==============================
    ==============================
*/
// route    => /api/products
// method   => POST
// access   => private  level 1 => admins only route
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "invalid inputs" });
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});
// route    => /api/products
// method   => GET
// access   => public
router.get("/", async (req, res) => {
  try {
    products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
});
// route    => /api/products/?id
// method   => GET
// access   => public
router.get("/:id", async (req, res) => {
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
});
// route    => /api/products/best_selling
// method   => GET
// access   => public
router.get("/best_selling", async (req, res) => {
  try {
    products = await Product.find().sort({ sold: -1 }).limit(4);
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
});
// route    => /api/products/new
// method   => GET
// access   => public
router.get("/new", async (req, res) => {
  try {
    products = await Product.find().sort({ createdAt: -1 }).limit(4);
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
});
module.exports = router;
