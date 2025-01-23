import { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'
import { getRandomToken, secret, verifyAnswer } from '@/utils/token-utils'

export async function GET() {
  const token = getRandomToken()
  return Response.json({
    token,
  })
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-token')
    const answer = request.headers.get('x-answer')

    if (!token || !answer) {
      return Response.json({ error: 'Missing token or answer' }, { status: 401 })
    }

    try {
      const verified = verify(token, secret)
      const answerVerification = verifyAnswer(token, answer)
      
      if (verified && answerVerification) {
        return Response.json({ message: 'Success' }, { status: 200 })
      } else {
        return Response.json({ error: 'Incorrect Answer' }, { status: 401 })
      }
    } catch (verifyError) {
      console.error('Token verification error:', verifyError)
      return Response.json({ error: 'Invalid token' }, { status: 401 })
    }
  } catch (error) {
    console.error('Server error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
} 
