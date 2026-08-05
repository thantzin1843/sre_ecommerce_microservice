const orderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.updateOrder(id, req.body);
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const result = await orderService.deleteOrder(id);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrdersByCustomerId(req, res, next) {
    try {
      const { customerId } = req.params;
      const orders = await orderService.getOrdersByCustomerId(customerId);
      res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
