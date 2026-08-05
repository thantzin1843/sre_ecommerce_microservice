const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrderCreation, validateOrderUpdate } = require('../middleware/validationMiddleware');

router.post('/orders', validateOrderCreation, orderController.createOrder.bind(orderController));
router.get('/orders', orderController.getAllOrders.bind(orderController));
router.get('/orders/:id', orderController.getOrderById.bind(orderController));
router.put('/orders/:id', validateOrderUpdate, orderController.updateOrder.bind(orderController));
router.delete('/orders/:id', orderController.deleteOrder.bind(orderController));
router.get('/customers/:customerId/orders', orderController.getOrdersByCustomerId.bind(orderController));

module.exports = router;
