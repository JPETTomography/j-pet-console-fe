# Use a Node.js image for development
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code
COPY . .

# Set environment variable for React
ARG REACT_APP_API_SOURCE
ENV REACT_APP_API_SOURCE=$REACT_APP_API_SOURCE

# Expose the React development server port
EXPOSE 3000

# Start React's development server
CMD ["npm", "start"]
