const express = require("express");

const controller = require("../controllers/product_controller");

const authorizeRole = require("../middlewares/authorizeRole_middleware");

const router = express.Router();

router.get("/", 
    authorizeRole("USER"),
    controller.getAll);

router.get("/:id", 
    authorizeRole("USER"),
    controller.getById);

router.post("/", 
    authorizeRole("ADMIN"),
    controller.create);

router.put("/:id", 
    authorizeRole("ADMIN"),
    controller.update);

router.delete("/:id", 
    authorizeRole("ADMIN"),
    controller.delete);

module.exports = router;