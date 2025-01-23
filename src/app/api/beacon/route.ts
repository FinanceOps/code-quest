import { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'
import { getRandomToken, secret, verifyAnswer } from '@/utils/token-utils'

export async function GET() {
  return Response.json({
    token: getRandomToken(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-quill-token')
    const answer = request.headers.get('x-quill-answer')

    if (!token || !answer) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verified = verify(token, secret)
    if (verified && verifyAnswer(token, answer)) {
      return Response.json('Success', { status: 200 })
    } else {
      return Response.json('Incorrect Answer', { status: 401 })
    }
  } catch{
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
} 
