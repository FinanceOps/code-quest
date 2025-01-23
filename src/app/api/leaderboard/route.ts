import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'your_secret_password_here' // Change this to your desired password

export interface Winner {
  name: string
  email: string
  time: string
  completedAt: string
  retries: number
  totalTime: number
}

async function getWinnersFile() {
  const filePath = path.join(process.cwd(), 'winners.json')
  const fileContent = await fs.readFile(filePath, 'utf8')
  return JSON.parse(fileContent)
}

async function saveWinnersFile(data: { winners: Winner[] }) {
  const filePath = path.join(process.cwd(), 'winners.json')
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('x-admin-password')
    
    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await getWinnersFile()
    return NextResponse.json(data.winners)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch winners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, time, retries, totalTime } = await request.json()
    const data = await getWinnersFile()
    
    // Find existing entry by email
    const existingIndex = data.winners.findIndex((w: Winner) => w.email === email)
    const newWinner: Winner = {
      name,
      email,
      time,
      retries,
      totalTime,
      completedAt: new Date().toISOString()
    }
    
    if (existingIndex >= 0) {
      data.winners[existingIndex] = newWinner // Update existing entry
    } else {
      data.winners.push(newWinner) // Add new entry
    }
    
    await saveWinnersFile(data)
    return NextResponse.json(newWinner)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add winner' }, { status: 500 })
  }
} 
