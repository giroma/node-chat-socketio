const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'ari',
      room: 'ember'
    },{
      id: '2',
      name: 'matt',
      room: 'gym'
    },{
      id: '3',
      name: 'lynn',
      room: 'ember'
    }]
  })

  it('should add new user', () => {
    let users = new Users()
    let user = {
      id: '123',
      name: 'ari',
      room: 'ember'
    }
    let resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
    console.log(users.users);
  })
  it('should get user', () => {
    let user = users.getUser('2');
    expect(user.id).toEqual('2')
  })
  it('should remove a user', () => {
    let userList = users.removeUser('1');
    expect(userList.length).toBe(2)
  })
  it('should return names for ember', () => {
    let userList = users.getUserList('ember');
    expect(userList).toEqual(['ari', 'lynn'])
  })
  it('should return names for gym', () => {
    let userList = users.getUserList('gym');
    expect(userList).toEqual(['matt'])
  })
})
