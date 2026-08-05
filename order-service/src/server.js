const express = require('express');
const config = require('./config/config');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Order Microservice is running on port ${PORT}`);
  console.log(`Environment: ${config.env}`);
  console.log(`API Endpoints:`);
  console.log(`  POST   /orders`);
  console.log(`  GET    /orders`);
  console.log(`  GET    /orders/:id`);
  console.log(`  PUT    /orders/:id`);
  console.log(`  DELETE /orders/:id`);
  console.log(`  GET    /customers/:customerId/orders`);
});

module.exports = app;
