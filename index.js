const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');
const Swagger = require('./middlewares/swagger');
const SwaggerUi = require('koa2-swagger-ui');
const Routes = require('./routes');

// Options to use with mongoose (mainly to avoid deprecacy warnings)
const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
};
// Connect to the MongoDB database
Mongoose.connect('mongodb://localhost:27017/sport-with-me', mongooseOptions);
// Use auto increment for models
AutoIncrement.initialize(Mongoose.connection);


// Create the Koa app
const app = new Koa();
// Create a router object
const router = new Router();
// Register all routes by passing the router to them
Routes(router);

// Options to generate the swagger documentation
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sport with me',
            version: '1.0.0',
            description: 'Travail de bachelor',
        },
    },
    /** 
     * Paths to the API docs. The library will fetch comments marked 
     * by a @swagger tag to create the swagger.json document
     */
    apis: [
        './controllers/activities.js',
        './controllers/users.js',
    ],
    // where to publish the document
    path: '/swagger.json',
}

// Call our own middleware (see in file)
const swagger = Swagger(swaggerOptions);

// Build the UI for swagger and expose it on the /doc endpoint
const swaggerUi = SwaggerUi({
    routePrefix: '/doc',
    swaggerOptions: {
        url: swaggerOptions.path,
    }
});

// Register all middlewares, in the right order
app
    .use(swagger)
    .use(swaggerUi)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);