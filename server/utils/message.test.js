const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'jen'
    const text = 'message teeeeeest'
    const message = generateMessage(from, text)

console.log(message);
    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({from, text})
  })
})
describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'admin'
    const latitude = 123
    const longitude = 456
    const url = 'https://www.google.com/maps?=123,456'
    const message = generateLocationMessage(from, latitude, longitude)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({from, url})
  })
})
