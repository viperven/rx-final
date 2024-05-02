const express = require("express");
const router = express.Router();
const userModel = require("../Models/users.model");
const bcrypt = require("bcrypt");
const {
  encryptPasswordFunction,
  comparePasswordFunction,
} = require("../controllers/helper.controllers");
const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");

router.post("/Registration", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log(name, email, password);
    let emailExists = await userModel.findOne({ email: email });
    if (!emailExists) {
      encryptPasswordFunction(password)
        .then((encryptPassword) => {
          userModel.create({
            name: name,
            email: email,
            password: encryptPassword,
          });
          res
            .status(200)
            .send({ result: true, message: "user created successfully" });
        })
        .catch((err) => {
          console.log("internal error", err);
          res.status(500).send("internal error");
        });
    } else {
      res.status(400).send({ result: false, message: "Email already exists" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/Login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) {
      comparePasswordFunction(password, emailExists.password)
        .then((passwordMatched) => {
          if (passwordMatched) {
            const token = jwt.sign({ email }, "mysecretkey", {
              expiresIn: "2d",
            });
            res.cookie("authentication_token", token, {
              maxAge: 2 * 24 * 60 * 60 * 1000,
            });
            res
              .status(200)
              .send({ result: true, message: "logged in successfully" });
          } else {
            res
              .status(400)
              .send({ result: false, message: "password dont match" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("internal server error");
        });
    } else {
      res.status(400).send("Email does not exist");
    }
  } catch (err) {
    console.log("err in userLogin", err);
  }
});

router.get("/verifyToken", (req, res) => {
  const token = req.cookies["authentication_token"];
  if (token) {
    jwt.verify(token, "mysecretkey", (err, decoded) => {
      if (err) {
        console.log("workin error");
        res.status(500).send({ result: false, message: "invalid token" });
      } else {
        res
          .status(200)
          .send({ result: true, message: "logged in successfully" });
      }
    });
  } else {
    res.status(400).send("invalid token");
  }
});

module.exports = router;
