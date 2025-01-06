const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const app = express();

//Middlewares
app.use(helmet());
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ProductRouter = require("./routes/productRoute.js");
const userRouter = require("./routes/userRoute.js");

app.use('/api/products', ProductRouter)
app.use('/api/auth', userRouter)
app.listen(process.env.PORT, () => {
  console.log("listening to port 3000");
});

//DB connection
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((error) => {
    console.log("connection failed:", error);
  });
