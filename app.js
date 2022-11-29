const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProductById,
  deleteProductsByid,
} = require("./controllers/prodCon");

router.post("/create", createProduct);
router.get("/allProducts", getAllProducts);
router.get("/allProducts/:id", getProductsById);
router.put("/updateProducts/:id", updateProductById);
router.delete("/deleteProducts/:id", deleteProductsByid);

module.exports = router;
