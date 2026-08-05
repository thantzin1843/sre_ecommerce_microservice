const Product = require("../models/product");

class ProductRepository {

    async findAll() {
        return await Product.find();
    }

    async findById(id) {
        return await Product.findById(id);
    }

    async save(product) {
        return await Product.create(product);
    }

    async update(id, product) {
        return await Product.findByIdAndUpdate(
            id,
            product,
            { new: true }
        );
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }

}

module.exports = new ProductRepository();