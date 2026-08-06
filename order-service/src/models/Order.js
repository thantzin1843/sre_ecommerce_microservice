const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  customerId: {
    type: String,
    required: [true, 'Customer ID is required']
  },
  items: {
    type: [itemSchema],
    required: [true, 'Items are required'],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'At least one item is required'
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

orderSchema.pre('save', function(next) {
  if (this.isModified('items') || this.isNew) {
    this.totalAmount = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }
  this.updatedAt = new Date();
  next();
});

orderSchema.methods.toJSON = function() {
  const order = this.toObject();
  order.createdAt = order.createdAt.toISOString();
  order.updatedAt = order.updatedAt.toISOString();
  return order;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
