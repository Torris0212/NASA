FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy NASA project the host to the container (/app) and install packages
COPY package*.json ./

COPY client/package*.json client/

RUN npm install --prefix client --omit=dev

COPY server/package*.json server/

RUN npm install --prefix server --omit=dev

COPY client/ client/

RUN npm run build --prefix client

COPY server/ server/

# Specify the UID (user identifier) that should be used when running the subsequent commands in the Docker image.
USER node

# Run a command: npm start --prefix server
CMD [ "npm", "start", "--prefix", "server" ]

# Expose a port
EXPOSE 8000