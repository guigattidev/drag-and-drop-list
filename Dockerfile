# Base image with Node
FROM node as BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm i -f

# Copy the entire application directory to the container
COPY . .

# Executes npm run dev to start the server
EXPOSE 8080
CMD ["npm", "run", "dev"] 