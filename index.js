const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send("Yep it's working");
});

app.get('/love', (req, res) => {
  res.send('Hi Love');
});

app.listen(3000, function() {
  console.log('listening on 3000');
});
