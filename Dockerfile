# Stage 1: Build the application
FROM node:20.15.0 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using npm ci
RUN npm ci

# Copy the rest of the application files
COPY . .

# Compile TypeScript code
RUN npm run build

# Stage 2: Create a production image
FROM node:20.15.0-slim AS production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install only production dependencies using npm ci
RUN npm ci --only=production

# Copy the compiled code from the build stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start the server
CMD ["node", "dist/server.js"]
