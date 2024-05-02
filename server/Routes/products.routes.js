const express = require("express");
const router = express.Router();

//Models
const productModel = require("../Models/products.model");

router.get("/", async (req, res) => {
  try {
    const productsData = await productModel.find();
    res.json(productsData);
  } catch (errr) {
    console.log("Insert Server Error: EndPoint /products" + errr);
    res.status(500).send("Insert Server Error" + errr);
  }
});

//get products with pagination
router.get("/getProducts", async (req, res) => {
  try {
    let page = Number(req.query.page) || 1; // 2
    let limit = Number(req.query.limit) || 5; //4
    let skip = (page - 1) * limit;

    //fetch paginated products data
    const productsData = await productModel.find().skip(skip).limit(limit);

    //fetch total number of products for frontend pagination
    const totalNumberOfProducts = await productModel.countDocuments();

    res.json({
      length: productsData.length,
      data: productsData,
      totalCount: totalNumberOfProducts,
    });
  } catch (errr) {
    console.log("Insert Server Error: EndPoint /products" + errr);
    res.status(500).send("Insert Server Error" + errr);
  }
});

router.post("/singleProduct", async (req, res) => {
  try {
    const { id } = req.body;
    const singleProduct = await productModel.findOne({ id: id });
    if (singleProduct) {
      res.status(200).json(singleProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send("internal error in");
    console.log("interal error in /singleproduct");
  }
});

//Add products
router.post("/addproduct", async (req, res) => {
  try {
    const {
      id,
      img,
      img2,
      img3,
      img4,
      img5,
      company,
      title,
      color,
      category,
      prevPrice,
      newPrice,
    } = req.body;
    let idExists = await productModel.findOne({ id: id });
    if (!idExists) {
      const newProduct = productModel({
        id,
        img,
        img2,
        img3,
        img4,
        img5,
        company,
        title,
        color,
        category,
        prevPrice,
        newPrice,
      });
      await newProduct.save();
      console.log("product added");
      res
        .status(201)
        .json({ result: true, message: "Product added successfully" });
    } else {
      console.log("Product ID already existed");
      res
        .status(201)
        .json({ result: false, message: "Product ID already existed" });
    }
  } catch (error) {
    console.log("Insert error at point" + error);
    res.status(500).send("Insert Server Error: " + error);
  }
});

router.post("/testProduct", async (req, res) => {
  const img1 = "abc",
    img2 = "Adasd",
    img3 = "Asdasd",
    img4 = "werwerwer";
  const data = await productModel.create({
    id: 301,
    images1: [img1, img2, img3, img4],
    company1: {
      name: "Woodland",
      address: "123 and address name",
      contact: "+123456789",
    },
    title: "Leather sneakers",
    color: "red",
    category: "sneakers",
    quantity: 10,
    price: {
      prev: 1500,
      current: 9999,
    },
    sellerInfo: {
      sellerId: 421,
      sellerRating: 3,
    },
  });
  res.status(200).send({ msg: "done", data: data });
});

module.exports = router;
