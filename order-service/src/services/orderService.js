const Order = require('../models/Order');

class OrderService {
  async createOrder(orderData) {
    try {
      const order = new Order(orderData);
      await order.save();
      return order.toJSON();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(`Validation failed: ${Object.values(error.errors).map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  }

  async getAllOrders() {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return orders.map(order => order.toJSON());
  }

  async getOrderById(orderId) {
    const order = await Order.findOne({ orderId });
    
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return order.toJSON();
  }

  async updateOrder(orderId, updateData) {
    try {
      const order = await Order.findOneAndUpdate(
        { orderId },
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }

      return order.toJSON();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(`Validation failed: ${Object.values(error.errors).map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  }

  async deleteOrder(orderId) {
    const order = await Order.findOneAndDelete({ orderId });
    
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return { message: `Order ${orderId} deleted successfully` };
  }

  async getOrdersByCustomerId(customerId) {
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    return orders.map(order => order.toJSON());
  }
}

module.exports = new OrderService();
