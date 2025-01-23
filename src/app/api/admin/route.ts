import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-quill-secret')
    if (secret === 'hLW*RuCP%CP@vWh*58HNM5HCx@jPKGN7QysTb#BF&') {
      return NextResponse.json({ message: 'Cleared!' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
} 
