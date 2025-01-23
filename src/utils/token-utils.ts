const tokens = require('./tokens.json')
export const secret = 'quillbot-beacon-signal-key'

export function verifyAnswer(token: string, answer: string) {
  return tokens[token] === answer
}

export function getRandomToken() {
  const keys = Object.keys(tokens)
  return keys[getRandomInt(100)]
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
