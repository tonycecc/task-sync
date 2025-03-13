# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Declare build arguments
ARG NEXT_PUBLIC_TASKSYNC_API
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Set them as environment variables for the build
ENV NEXT_PUBLIC_TASKSYNC_API=$NEXT_PUBLIC_TASKSYNC_API
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# (Optional) Debug: Print out the variables
RUN echo "DEBUG: NEXT_PUBLIC_TASKSYNC_API is '$NEXT_PUBLIC_TASKSYNC_API'"
RUN echo "DEBUG: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is '$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'"

# Build the Next.js application
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
