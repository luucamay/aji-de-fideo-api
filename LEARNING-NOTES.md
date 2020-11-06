# Learning Notes about express nodejs and mongodb crud app

## Difference between middlware function and a route handler
The only difference between a middleware function and a route handler callback is that middleware functions have a third argument next, which middleware functions are expected to call if they are not that which completes the request cycle (when the middleware function is called, this contains the next function that must be called).

 ## Questions
 * To use the constructor or the class for MongoDB??
 
 ## Resources to watch:
 * [Basic routing http request and crud operation with express and mongodb](https://dev.to/ichtrojan/basic-routing-http-requests-and-crud-operation-with-express-and-mongodb-od2)
 * [NodeJS MondoDB Driver API](http://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html)
 * [Database integration](https://expressjs.com/en/guide/database-integration.html#mongodb)
 * [MDN about Routes and controllers](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
 * [Writing middlewares](http://expressjs.com/en/guide/writing-middleware.html)
 * [Using middleware](https://expressjs.com/en/guide/using-middleware.html)