import { NextRequest, NextResponse } from 'next/server'
import { clearWinners } from '@/utils/leaderboard'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-quill-secret')
    if (secret === 'nimda') {
      clearWinners()
      return NextResponse.json({ message: 'Cleared!' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
} 
