# Learning Notes about express nodejs and mongodb crud app

## Difference between middlware function and a route handler
The only difference between a middleware function and a route handler callback is that middleware functions have a third argument next, which middleware functions are expected to call if they are not that which completes the request cycle (when the middleware function is called, this contains the next function that must be called).