const express = require('express');

const setCurrentUser = require('./middleware/setCurrentUser.js');
const isLoggedIn = require("./middleware/isLoggedIn.js");

const app = express();

app.use(setCurrentUser);

app.get("/users", isLoggedIn, function(req, res) {
  // get users...
});