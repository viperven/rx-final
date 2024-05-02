const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  img: String,
  img2: String,
  img3: String,
  img4: String,
  img5: String,
  company: String,
  title: String,
  color: String,
  category: String,
  prevPrice: String,
  newPrice: String,
  company1: {
    name: String,
    address: String,
    contact: String,
  },
  images1: [String],
});

const productModel = new mongoose.model("products", productSchema);

module.exports = productModel;
