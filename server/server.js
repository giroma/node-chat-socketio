const path = require('path')
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome User'))

  socket.broadcast.emit('newMessage', generateMessage('admin', 'New User joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('client disconected');
  })
})

server.listen(port, () => {
  console.log('started on port ', port);
})
