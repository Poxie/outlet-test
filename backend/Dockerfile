FROM node:16-alpine

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install --global typescript

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Run Prisma migrations
RUN npx prisma migrate deploy

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]