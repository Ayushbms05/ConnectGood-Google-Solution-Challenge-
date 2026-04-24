# Use the official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Cloud Run uses port 8080 by default
EXPOSE 8080

# Start the Node.js server
CMD [ "npm", "start" ]
