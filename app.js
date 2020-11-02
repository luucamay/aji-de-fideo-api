const express = require('express');
// bodyParser to parser JSON requests
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});