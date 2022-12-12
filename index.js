const express = require("express");
const mongoose = require("mongoose");
const prodMod = require("./model/product");
const port = 2000;
const app = express();
const {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductsByid,
} = require("./controllers/prodCon");
const productRoute = require("./app");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/product", productRoute);

const connectToDb = mongoose.connect(
  "mongodb://localhost:27017/MVC_crud",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Database connected sucessfully`);
    }
  }
);

app.get("/", (req, res) => {
  res.render("index", { products: "" });
});

app.post("/", (req, res) => {
  res.render("index");
});
app.get("/createProd", (req, res) => {
  res.render("addProduct");
});
app.get("/updateProducts/:id", (req, res, err) => {
  let id = req.params.id;
  prodMod
    .findById({ _id: id })
    .then((data) => {
      res.render("updateProduct", { products: data });
    })
    .catch(err);
});

app.get("/getProd", getAllProducts);
app.post("/createProd", createProduct);
app.post("/updateProducts1/:id", updateProductById);
app.get(`/deleteProducts/:id`, deleteProductsByid);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running on port ${port}`);
  }
});
