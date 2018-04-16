let socket = io();

function scrollToBottom() {
  //selectors
  let messages = jQuery('#messages')
  let newMessage = messages.children('li:last-child')
  //heights
  let clientHeight = messages.prop('clientHeight')
  let scrollTop = messages.prop('scrollTop')
  let scrollHeight = messages.prop('scrollHeight')
  let newMessageHeight = newMessage.innerHeight()
  let lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  let params = jQuery.deparam(window.location.search)
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    }else {
      console.log('no error');
    }
  })

})
socket.on('disconnect', function () {
  console.log('disconnected from server');
})

socket.on('updateUserList', function (users) {
  let ol = jQuery('<ol></ol>')

  users.forEach(function (user){
    ol.append(jQuery('<li></li>').text(user))
  })
  jQuery('#users').html(ol)
})

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = jQuery('#message-template').html()
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
  scrollToBottom()
  // let formattedTime = moment(message.createdAt).format('h:mm a')
  // let li = jQuery('<li></li>')
  // li.text(`${message.from} ${formattedTime}: ${message.text}`)
  //
  // jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = jQuery('#location-message-template').html()
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })

    jQuery('#messages').append(html)
    scrollToBottom()

  // let li = jQuery('<li></li>')
  // let a = jQuery('<a target="_blank">My current location</a>')
  //
  // li.text(`${message.from} ${formattedTime}:`)
  // a.attr('href', message.url)
  // li.append(a)
  // jQuery('#messages').append(li)
})


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  const messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

let locationButton = jQuery('#send-location')
locationButton.on('click', function (){
  if (!navigator.geolocation) {
    return alert('gelocation not supported by your browser')
  }
  locationButton.attr('disabled', 'disabled').text('sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location')
    alert('unable to fetch location')
  })
})
