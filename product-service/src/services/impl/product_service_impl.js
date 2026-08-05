const ProductService = require("../product_service");

const repository = require("../../repositories/product_repository");

class ProductServiceImpl extends ProductService {

    async findAll() {
        return await repository.findAll();
    }

    async findById(id) {

        const product = await repository.findById(id);

        if (!product)
            throw new Error("Product not found");

        return product;
    }

    async create(product) {

        if (product.price < 0)
            throw new Error("Invalid price");

        return await repository.save(product);
    }

    async update(id, product) {

        return await repository.update(id, product);
    }

    async delete(id) {

        return await repository.delete(id);
    }

}

module.exports = new ProductServiceImpl();