FROM node:10

# Create app directory
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8877

CMD [ "node", "app.js" ]