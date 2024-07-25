FROM node:16-alpine

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install --global typescript

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG PORT
ARG ADMIN_URL
ARG CLIENT_URL
ARG BCRYPT_SALT_ROUNDS
ARG JWT_SECRET
ARG REDIS_URL
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_SECRET
ARG PROPERTY_ID
ARG DATABASE_URL

ENV PORT=$PORT
ENV ADMIN_URL=$ADMIN_URL
ENV CLIENT_URL=$CLIENT_URL
ENV BCRYPT_SALT_ROUNDS=$BCRYPT_SALT_ROUNDS
ENV JWT_SECRET=$JWT_SECRET
ENV REDIS_URL=$REDIS_URL
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_SECRET=$CLOUDINARY_SECRET
ENV PROPERTY_ID=$PROPERTY_ID
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma client
RUN DATABASE_URL=$DATABASE_URL npx prisma generate

# Run Prisma migrations
RUN DATABASE_URL=$DATABASE_URL npx prisma migrate deploy

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]