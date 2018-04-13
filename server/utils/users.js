[{
  id: '/#1ew24535',
  name: 'arithur',
  room: 'office'
}]

class Users {
  constructor(name, age) {
    this.users = []
  }
  addUser (id, name, room) {
    let user = {id, name, room}
    this.users.push(user)
    return user
  }
}
module.exports = {Users}
