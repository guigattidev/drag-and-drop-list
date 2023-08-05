# Base image with Node
FROM node as BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm --force install

# Copy the entire application directory to the container
COPY . .

# Build our project
RUN npm run build

# Beginning of second stage
FROM node as PRODUCTION_IMAGE

WORKDIR /app/react-app

# Copying folder from BUILD_IMAGE to this stage
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

# Exposes the port to access the app from outside the container i.e from the browser
EXPOSE 8080

# Dependencies
COPY package*.json ./
COPY package-lock.json .
COPY vite.config.ts .

# Executes npm run dev to start the server
EXPOSE 8080
RUN npm install typescript
CMD ["npm", "run", "dev"] 