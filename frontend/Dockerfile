# Base Image
FROM node:22-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project
COPY . .

# Expose Vite port
EXPOSE 5173

# Start Vite
CMD ["npm", "run", "dev", "--", "--host","0.0.0.0"]