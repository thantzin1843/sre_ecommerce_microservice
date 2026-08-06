const express = require('express');
const config = require('./config/config');
const connectDatabase = require('./config/database');
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

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`Order Microservice is running on port ${PORT}`);
      console.log(`Environment: ${config.env}`);
      console.log(`MongoDB URI: ${config.mongodbUri}`);
      console.log(`API Endpoints:`);
      console.log(`  POST   /orders`);
      console.log(`  GET    /orders`);
      console.log(`  GET    /orders/:id`);
      console.log(`  PUT    /orders/:id`);
      console.log(`  DELETE /orders/:id`);
      console.log(`  GET    /customers/:customerId/orders`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
