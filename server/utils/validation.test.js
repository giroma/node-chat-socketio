const expect = require('expect');
const {isRealString} = require('./validation');

describe('validation testing', () => {
  it('should reject non string values', () => {
    expect(isRealString(234)).toBe(false)
    expect(isRealString('')).toBe(false)
    expect(isRealString('    ')).toBe(false)
  })
  it('should allow only correct string input', () => {
    expect(isRealString('hello')).toBe(true)
    expect(isRealString('   hello   ')).toBe(true)
    expect(isRealString('hello there')).toBe(true)
  })
})
