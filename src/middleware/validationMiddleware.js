const validateOrderCreation = (req, res, next) => {
  const { customerId, items } = req.body;

  if (!customerId) {
    return res.status(400).json({
      success: false,
      error: 'customerId is required'
    });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'items must be a non-empty array'
    });
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.productId) {
      return res.status(400).json({
        success: false,
        error: `items[${i}].productId is required`
      });
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: `items[${i}].quantity must be a positive number`
      });
    }
    if (item.price === undefined || typeof item.price !== 'number' || item.price < 0) {
      return res.status(400).json({
        success: false,
        error: `items[${i}].price must be a non-negative number`
      });
    }
  }

  next();
};

const validateOrderUpdate = (req, res, next) => {
  const { customerId, items, status } = req.body;

  if (customerId && typeof customerId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'customerId must be a string'
    });
  }

  if (items) {
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'items must be an array'
      });
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.productId) {
        return res.status(400).json({
          success: false,
          error: `items[${i}].productId is required`
        });
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          error: `items[${i}].quantity must be a positive number`
        });
      }
      if (item.price === undefined || typeof item.price !== 'number' || item.price < 0) {
        return res.status(400).json({
          success: false,
          error: `items[${i}].price must be a non-negative number`
        });
      }
    }
  }

  if (status) {
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `status must be one of: ${validStatuses.join(', ')}`
      });
    }
  }

  next();
};

module.exports = {
  validateOrderCreation,
  validateOrderUpdate
};
