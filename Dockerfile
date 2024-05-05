FROM node:22-alpine3.18
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./

ENV DOCKER=true

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD [ "node", "server.js" ]