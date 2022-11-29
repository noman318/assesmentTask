const ProductModel = require("../model/product");

const createProduct = async (req, res) => {
  const productData = req.body;
  let insert = new ProductModel(productData);
  insert.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Product is added");
    }
  });
};
const getAllProducts = async (req, res) => {
  ProductModel.find({}, (err, data) => {
    if (err) {
      res.send("SomeThing went wrong");
    } else {
      res.send(data);
    }
  });
};

const getProductsById = async (req, res) => {
  let pid = req.params.id;
  let product = await ProductModel.findById(pid);
  if (!product) {
    res.status(404).send("Not Found");
  } else {
    res.send(product);
  }
};

const updateProductById = async (req, res) => {
  let pid = req.params.id;
  const updateData = req.body;
  console.log(pid);
  console.log(updateData);
  ProductModel.updateOne({ pid }, { $set: updateData }, (err) => {
    if (err) {
      console.log("Error", +err);
    } else {
      res.send("Product Updated");
    }
  });
};

const deleteProductsByid = async (req, res) => {
  let pid = req.params.id;
  let productDel = await ProductModel.findByIdAndDelete(pid);
  // console.log(productDel);
  if (!productDel) {
    res.status(404).send("Not Found");
  } else {
    res.send(productDel);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProductById,
  deleteProductsByid,
};
