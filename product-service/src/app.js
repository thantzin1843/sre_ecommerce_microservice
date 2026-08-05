const express = require("express");

const productRoutes = require("./routes/product_routes");

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoutes);

module.exports = app;