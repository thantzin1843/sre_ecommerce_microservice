# Order Microservice

A complete, production-ready Order Microservice built with Node.js, Express, and MongoDB.

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
- MongoDB persistence with Mongoose ODM

## Project Structure

```
order-microservice/
├── src/
│   ├── config/
│   │   ├── config.js          # Application configuration
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   └── orderController.js # Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling middleware
│   │   ├── logger.js          # Request logging
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   └── Order.js           # Mongoose Order schema
│   ├── routes/
│   │   └── orderRoutes.js     # API routes
│   ├── services/
│   │   └── orderService.js    # Business logic layer
│   └── server.js              # Application entry point
├── .env                       # Environment variables
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or cloud)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally or use a cloud MongoDB instance
   - Ensure MongoDB is running on the default port (27017) or update the connection string in `.env`

3. Configure environment variables in `.env`:
```bash
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
MONGODB_URI=mongodb://localhost:27017/order_database_nodejs
```

## Usage

Start the server:
```bash
npm start
```

The server will:
- Connect to MongoDB using the connection string from `.env`
- Start on port 3000 (or the port specified in the PORT environment variable)
- Create the Order collection automatically on first use

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
- MongoDB
- Mongoose ODM
- dotenv (environment variable management)

## Database Schema

### Order Collection
- `orderId` (string, unique, auto-generated ObjectId)
- `customerId` (string, required)
- `items` (array of objects, required)
  - `productId` (string, required)
  - `quantity` (number, required, > 0)
  - `price` (number, required, >= 0)
- `totalAmount` (number, auto-calculated from items)
- `status` (string, enum: pending, confirmed, shipped, delivered, cancelled)
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-updated)

## MongoDB Setup

### Local MongoDB Installation

1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - Windows: Run MongoDB as a service
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Verify connection: `mongosh` or `mongo`

### MongoDB Connection

The application connects to MongoDB using the connection string from the `.env` file. The default configuration uses:
```
mongodb://localhost:27017/order_database_nodejs
```

The connection is established in `src/config/database.js` with error handling and graceful shutdown.

## Future Enhancements

- Add authentication and authorization
- Add rate limiting
- Add API documentation (Swagger/OpenAPI)
- Add unit and integration tests
- Add Docker support
- Add CI/CD pipeline
- Add database indexing for performance optimization
- Add database migration scripts
