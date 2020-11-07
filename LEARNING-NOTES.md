# About middlewares

When your repeat the same code at the beginning of an express route handler those are moments where you can use a middleware.

## What are middlewares?
Middlewares are functions that can:
* execute any code
* make changes to the request and response objects
* end the request-response cycle
* call the next middleware function in the stack

## To define a middleware function
1. Call ```app.use()```
2. Pass it a function.

## What is ```next()``` ?
The ```next()``` call tells the middleware to go to the next middleware function!
** If you do not call the ```next()``` function your request will get stuck on this middleware

## What arguments has the ```use``` method?
* Only one argument that is a function
* Two arguments: The first one is optional, can be a route, the second one is a function

## Common middlewares
* body-parser
* cors