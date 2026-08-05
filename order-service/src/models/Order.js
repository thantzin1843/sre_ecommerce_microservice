const { v4: uuidv4 } = require('uuid');

class Order {
  constructor(data) {
    this.orderId = data.orderId || uuidv4();
    this.customerId = data.customerId;
    this.items = data.items || [];
    this.totalAmount = data.totalAmount || 0;
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.customerId || typeof this.customerId !== 'string') {
      errors.push('customerId is required and must be a string');
    }

    if (!Array.isArray(this.items)) {
      errors.push('items must be an array');
    } else {
      this.items.forEach((item, index) => {
        if (!item.productId || typeof item.productId !== 'string') {
          errors.push(`items[${index}].productId is required and must be a string`);
        }
        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
          errors.push(`items[${index}].quantity must be a positive number`);
        }
        if (typeof item.price !== 'number' || item.price < 0) {
          errors.push(`items[${index}].price must be a non-negative number`);
        }
      });
    }

    if (typeof this.totalAmount !== 'number' || this.totalAmount < 0) {
      errors.push('totalAmount must be a non-negative number');
    }

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(this.status)) {
      errors.push(`status must be one of: ${validStatuses.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  calculateTotal() {
    this.totalAmount = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    return this.totalAmount;
  }

  toJSON() {
    return {
      orderId: this.orderId,
      customerId: this.customerId,
      items: this.items,
      totalAmount: this.totalAmount,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Order;
