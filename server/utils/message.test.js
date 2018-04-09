const expect = require('expect');
const {generateMessage} = require('./message');

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
