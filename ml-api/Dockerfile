FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Set environment variable for MODEL_URL
ENV MODEL_URL=MODEL_URL

# Expose the port used by the application
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
