const express = require("express");
const mongoose = require("mongoose");
const port = 2000;
const app = express();
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
  res.send("Root api is Running");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running on port ${port}`);
  }
});
