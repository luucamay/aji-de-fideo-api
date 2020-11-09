const express = require('express');
const setCurrentUser = require('./middleware/setCurrentUser.js');

const app = express();

app.use(setCurrentUser);

// ...