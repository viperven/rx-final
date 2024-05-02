const express = require("express");
const app = express();
const cors = require("cors");
const productsroute = require("./Routes/products.routes");
const userroute = require("./Routes/users.routes");
const sellerroute = require("./Routes/seller.routes");
const cookieParser = require("cookie-parser");

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//connection
require("./Connection");

//Routes
app.use("/api/products", productsroute);
app.use("/api/users", userroute);
app.use("/api/seller", sellerroute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
