# Aji de Fideo - API con Node.js
An API for restaurants made with NodeJS, Express and MongoDB.

## Índice

* [Resources found in the learning path](#resources)
* [Other implementations](#implementation)
* [Questions](#questions)
* [Insights](#insights)
* [Learning goals](#learning-goals)

## Resources
* [Official docs: Create HTTP Server in nodeJS](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/)
* [Digital Ocean version: Create HTTP Server in nodeJS](https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module)
* [Your first programm in nodeJS](https://www.digitalocean.com/community/tutorials/how-to-write-and-run-your-first-program-in-node-js)
* [Asynchronous code in NodeJS](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js)
* [Create a NodeJS Module](https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module)
* [Official docs on express are really clear](https://expressjs.com/en/starter/hello-world.html)
* [Setup a basic server with express framework](https://blog.vanila.io/setup-basic-server-with-express-framework-37b2ec749a6d)
* [Express route separation](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
* [MongoDB gitbook self-creation](https://lupemaydana.gitbook.io/learn-mongodb/)
* [Get started with MongoDB in 10 minutes](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)
* [MongoDB native driver vs Mongoose](https://developer.mongodb.com/article/mongoose-versus-nodejs-driver)
* [Connect your nodejs app to mongodb database](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database)
* [Mongo University: Create a NodeJS App MFLIX](https://university.mongodb.com/courses/M220JS/about)
* [Work with enviroment variables inside the .env file](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

## Questions
* What should return by default he GET endpoint? (Maybe just the name of the API and the version?)
* Use mongodb driver for nodejs or mongoose?

## Insights
* The end to end points are already created!
* Strongly suggest to use MongoDB because it is easier.
* There is a docker boilerplate to set up the endpoint.
* Hello world of NodeJS is the creation of an HTTP Server.
* We get HTML pages and JSON data as common server response.
* The request and the response objects in express are the same objects in Node.
* It is better to learn mongodb driver beacuse it shows you how to work with mongodb in general and not just for javascript
* Make sure you are actually connecting to your database throgh enviroment variables!

## API Client Checklist

### 7.1 `/`

* [x] `GET /`

### 7.2 `/auth`

* [ ] `POST /auth`

### 7.3 `/users`

* [ ] `GET /users`
* [ ] `GET /users/:uid`
* [ ] `POST /users`
* [ ] `PUT /users/:uid`
* [ ] `DELETE /users/:uid`

### 7.4 `/products`

* [ ] `GET /products`
* [ ] `GET /products/:productid`
* [ ] `POST /products`
* [ ] `PUT /products/:productid`
* [ ] `DELETE /products/:productid`

### 7.5 `/orders`

* [ ] `GET /orders`
* [ ] `GET /orders/:orderId`
* [ ] `POST /orders`
* [ ] `PUT /orders/:orderId`
* [ ] `DELETE /orders/:orderId`

## Learning goals

### Node

* [x] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [x] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [x] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [ ] Argumento de invocacion y de entorno

### Testing

* [x] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [x] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] Tests de integración.

### Estructura del código y guía de estilo

* [x] Organizar y dividir el código en módulos (Modularización)
* [x] Uso de identificadores descriptivos (Nomenclatura | Semántica)
* [ ] Uso de linter (ESLINT)

### Git y GitHub

* [x] Uso de comandos de git (add | commit | pull | status | push)
* [x] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [x] Colaboración en Github (branches | pull requests | |tags)
* [x] Organización en Github (projects | issues | labels | milestones)

### Express

* [ ] Rutas.
* [ ] `middlewares`

### HTTP

* [ ] [Request, Response.](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)
* [ ] Headers.
* [ ] Body.
* [ ] [Verbos HTTP.](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
* [x] [Codigos de status de HTTP.](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)
* [ ] Encodings y `JSON`.
* [ ] [CORS.](https://developer.mozilla.org/es/docs/Web/HTTP/Access_control_CORS)

### Autenticación

* [ ] `JWT`
* [ ] Almacenamiento y acceso de contraseñas.

### Servidores

* [ ] Variables de entorno.
* [ ] `SSH`
* [ ] `SSH` keys.
* [ ] Qué es un VPS.

### Base de datos (MongoDB o MySQL)

* [ ] Instalación.
* [ ] Conexión a través de cliente.
* [ ] Connection string.
* [ ] Queries y comandos (creación, lectura, actualización, eliminación)

### Deployment

* [ ] Contenedores.
* [ ] Docker.
* [ ] Docker compose.
