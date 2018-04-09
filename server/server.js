const path = require('path')
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'cait',
    text: 'moview tonight?',
    createdAt: 123123
  })

  socket.on('createMessage', (message) => {
    console.log('create message', message);
  })

  socket.on('disconnect', () => {
    console.log('client disconected');
  })
})

server.listen(port, () => {
  console.log('started on port ', port);
})
