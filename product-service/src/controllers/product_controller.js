const productService = require("../services/impl/product_service_impl");

class ProductController {

    async getAll(req, res) {

        try {

            const products = await productService.findAll();

            res.json(products);

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }
    }

    async getById(req, res) {

        try {

            const product = await productService.findById(req.params.id);

            res.json(product);

        } catch (err) {

            res.status(404).json({
                message: err.message
            });

        }
    }

    async create(req, res) {

        try {

            const product = await productService.create(req.body);

            res.status(201).json(product);

        } catch (err) {

            res.status(400).json({
                message: err.message
            });

        }
    }

    async update(req, res) {

        const product = await productService.update(
            req.params.id,
            req.body
        );

        res.json(product);
    }

    async delete(req, res) {

        await productService.delete(req.params.id);

        res.sendStatus(204);
    }

}

module.exports = new ProductController();