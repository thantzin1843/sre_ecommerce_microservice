# Installation Instructions

Due to PowerShell execution policy restrictions, you may need to install dependencies manually. Please follow these steps:

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or cloud)
- npm or yarn

## MongoDB Setup

Before installing dependencies, ensure MongoDB is running:

1. Install MongoDB locally or use a cloud MongoDB instance
2. Start MongoDB service:
   - Windows: Run MongoDB as a service
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Verify connection: `mongosh` or `mongo`

## Option 1: Allow PowerShell Scripts (Recommended)

Run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run:
```bash
npm install
```

## Option 2: Use Command Prompt

Open Command Prompt (cmd) instead of PowerShell and run:
```bash
npm install
```

## Option 3: Manual Installation

If the above options don't work, manually install the required packages:

```bash
npm install express mongoose dotenv
```

## Environment Configuration

Ensure your `.env` file contains the MongoDB connection string:

```bash
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
MONGODB_URI=mongodb://localhost:27017/order_database_nodejs
```

## After Installation

Once dependencies are installed and MongoDB is running, start the server:

```bash
npm start
```

The server will:
- Connect to MongoDB
- Start on port 3000 by default
- Create the Order collection automatically
