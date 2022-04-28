# Koa.js RESTapi

This RESTapi runs using Koa.js, with a MongoDb server. A documentation is automatically generated using Swagger.io.

## Requirements

- Node.js
- Koa.js
- A running MongoDb server

## Installation

`npm install`

## Starting the API

### Before starting

This RESTapi uses JWT for authentication, you need to set the secret into a _.env_ file. You also need to specify the port to listen to. It also requires a running MongoDb server, the port, name and hostname need to be specified in the _.env_ file.

```
# Port

PORT=3030

# JWT

JWT_SECRET=somesecret

# MongoDb

MONGO_PORT=xxxx
MONGO_DB=db_name
MONGO_HOSTNAME=hostname

```

### To start

`npm start`

### Once started

A short documentation of the API is available at : `localhost:<PORT_NUMBER>/doc`

### To delete passed activities

`node filterDb.js`
