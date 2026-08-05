const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  if (err.message.includes('not found')) {
    return res.status(404).json({
      success: false,
      error: err.message
    });
  }

  if (err.message.includes('Validation failed')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  if (err.message.includes('Invalid status')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
