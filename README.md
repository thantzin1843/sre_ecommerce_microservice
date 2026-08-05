# Order Microservice

A complete, production-ready Order Microservice built with Node.js and Express.

## Features

- Create new orders
- Retrieve all orders
- Get order by ID
- Update existing orders
- Delete orders
- Get orders by customer ID
- Input validation
- Centralized error handling
- Request logging
- RESTful API design

## Project Structure

```
order-microservice/
├── src/
│   ├── config/
│   │   └── config.js          # Application configuration
│   ├── controllers/
│   │   └── orderController.js # Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling middleware
│   │   ├── logger.js          # Request logging
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   └── Order.js           # Order model with validation
│   ├── routes/
│   │   └── orderRoutes.js     # API routes
│   ├── services/
│   │   └── orderService.js    # Business logic layer
│   └── server.js              # Application entry point
├── package.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (optional):
```bash
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

## Usage

Start the server:
```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### Create Order
**POST** `/orders`

Request body:
```json
{
  "customerId": "customer123",
  "items": [
    {
      "productId": "product1",
      "quantity": 2,
      "price": 29.99
    },
    {
      "productId": "product2",
      "quantity": 1,
      "price": 49.99
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-generated-id",
    "customerId": "customer123",
    "items": [...],
    "totalAmount": 109.97,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Orders
**GET** `/orders`

Response:
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### Get Order by ID
**GET** `/orders/:id`

Response:
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-generated-id",
    "customerId": "customer123",
    "items": [...],
    "totalAmount": 109.97,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Order
**PUT** `/orders/:id`

Request body (all fields optional):
```json
{
  "customerId": "newCustomer123",
  "items": [...],
  "status": "confirmed"
}
```

Valid statuses: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

Response:
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-generated-id",
    "customerId": "newCustomer123",
    "items": [...],
    "totalAmount": 109.97,
    "status": "confirmed",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:01:00.000Z"
  }
}
```

### Delete Order
**DELETE** `/orders/:id`

Response:
```json
{
  "success": true,
  "data": {
    "message": "Order uuid-generated-id deleted successfully"
  }
}
```

### Get Orders by Customer ID
**GET** `/customers/:customerId/orders`

Response:
```json
{
  "success": true,
  "data": [...],
  "count": 5
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Data Model

### Order
- `orderId` (string, auto-generated UUID)
- `customerId` (string, required)
- `items` (array of objects, required)
  - `productId` (string, required)
  - `quantity` (number, required, > 0)
  - `price` (number, required, >= 0)
- `totalAmount` (number, auto-calculated)
- `status` (string, enum: pending, confirmed, shipped, delivered, cancelled)
- `createdAt` (ISO date string, auto-generated)
- `updatedAt` (ISO date string, auto-updated)

## Technologies

- Node.js
- Express.js
- UUID (for generating unique IDs)

## Future Enhancements

- Add database persistence (MongoDB, PostgreSQL, etc.)
- Add authentication and authorization
- Add rate limiting
- Add API documentation (Swagger/OpenAPI)
- Add unit and integration tests
- Add Docker support
- Add CI/CD pipeline
