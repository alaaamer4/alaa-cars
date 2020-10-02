const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const user = require("./routes/users");
const product = require("./routes/products");

//* middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//*Routes
app.use("/api/users", user);
app.use("/api/products", product);
//* connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("connected to mongoDB");
  } catch (err) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

//*PORT
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
