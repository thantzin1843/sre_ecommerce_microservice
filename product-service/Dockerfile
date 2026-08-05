# Use Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Expose application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]