const express = require("express");
const mongoose = require("mongoose");
const app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ProductRouter = require("./routes/product.route.js");

app.use('/api/products', ProductRouter)
app.listen(3000, () => {
  console.log("listening to port 3000");
});

//DB connection
mongoose
  .connect(
    "mongodb+srv://sami:pascal1623@cluster0.fjr79.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch(() => {
    console.log("connection failed");
  });
