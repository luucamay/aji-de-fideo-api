const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let num = Math.floor((Math.random() * 10) + 1);
  // Make GET Request on every 2 second
  axios.get(
    `https://jsonplaceholder.typicode.com/posts/${num}`)

    // Print data
    .then(response => {
      const { id, title } = response.data
      console.log(`Post ${id}: ${title}\n`)
    })

    // Print error message if occur
    .catch(error => console.log(
      'Error to fetch data\n'))
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})