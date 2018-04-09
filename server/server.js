const path = require('path')
const publicPath = path.join(__dirname, '../public')
const express = require('express');

let app = express()

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('started on port 3000');
})
