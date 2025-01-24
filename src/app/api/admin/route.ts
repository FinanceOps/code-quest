import { NextRequest, NextResponse } from 'next/server'

import { secret as tokenSecret } from '../../../utils/token-utils'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-secret')
    if (secret === tokenSecret) {
      return NextResponse.json({ message: 'Cleared!' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
} 
