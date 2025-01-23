import tokens from './tokens.json'
export const secret = 'quillbot-beacon-signal-key'

const typedTokens: { [key: string]: string } = tokens

export function verifyAnswer(token: string, answer: string) {
  return typedTokens[token] === answer
}

export function getRandomToken() {
  const keys = Object.keys(typedTokens)
  return keys[getRandomInt(keys.length)]
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
