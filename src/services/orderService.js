const Order = require('../models/Order');

class OrderService {
  constructor() {
    this.orders = new Map();
  }

  async createOrder(orderData) {
    const order = new Order(orderData);
    
    const validation = order.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    order.calculateTotal();
    order.updatedAt = new Date().toISOString();

    this.orders.set(order.orderId, order);
    
    return order.toJSON();
  }

  async getAllOrders() {
    return Array.from(this.orders.values()).map(order => order.toJSON());
  }

  async getOrderById(orderId) {
    const order = this.orders.get(orderId);
    
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return order.toJSON();
  }

  async updateOrder(orderId, updateData) {
    const order = this.orders.get(orderId);
    
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    if (updateData.customerId) {
      order.customerId = updateData.customerId;
    }

    if (updateData.items) {
      order.items = updateData.items;
      order.calculateTotal();
    }

    if (updateData.status) {
      const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(updateData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      order.status = updateData.status;
    }

    order.updatedAt = new Date().toISOString();

    const validation = order.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    this.orders.set(orderId, order);
    
    return order.toJSON();
  }

  async deleteOrder(orderId) {
    const order = this.orders.get(orderId);
    
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    this.orders.delete(orderId);
    
    return { message: `Order ${orderId} deleted successfully` };
  }

  async getOrdersByCustomerId(customerId) {
    const customerOrders = Array.from(this.orders.values())
      .filter(order => order.customerId === customerId)
      .map(order => order.toJSON());
    
    return customerOrders;
  }
}

module.exports = new OrderService();
