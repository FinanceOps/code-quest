import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'hLW*RuCP%CP@vWh*58HNM5HCx@jPKGN7QysTb#BF&' // Change this to your desired password

export interface Winner {
  name: string
  email: string
  time: string
  completedAt: string
  retries: number
  totalTime: number
}

async function getWinnersFile() {
  try {
    const filePath = path.join(process.cwd(), 'winners.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist or is empty, return default structure
    return { winners: [] }
  }
}

async function saveWinnersFile(data: { winners: Winner[] }) {
  const filePath = path.join(process.cwd(), 'winners.json')
  // Ensure the data is serializable by converting to plain object
  const sanitizedData = {
    winners: data.winners.map(winner => ({
      name: String(winner.name),
      email: String(winner.email),
      time: String(winner.time),
      completedAt: String(winner.completedAt),
      retries: Number(winner.retries),
      totalTime: Number(winner.totalTime)
    }))
  }
  await fs.writeFile(filePath, JSON.stringify(sanitizedData, null, 2))
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('x-admin-password')
    
    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await getWinnersFile()
    // Ensure we're returning a serializable array
    const sanitizedWinners = data.winners.map((winner: Winner) => ({
      name: String(winner.name),
      email: String(winner.email),
      time: String(winner.time),
      completedAt: String(winner.completedAt),
      retries: Number(winner.retries),
      totalTime: Number(winner.totalTime)
    }))
    
    return NextResponse.json(sanitizedWinners)
  } catch (error) {
    console.error('Error fetching winners:', error)
    return NextResponse.json({ error: 'Failed to fetch winners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, time, retries, totalTime } = await request.json()
    
    // Validate required fields
    if (!name || !email || !time || retries === undefined || totalTime === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    let data = await getWinnersFile()
    
    // Ensure data has the correct structure
    if (!data || !Array.isArray(data.winners)) {
      data = { winners: [] }
    }
    
    // Find existing entry by email
    const existingIndex = data.winners.findIndex((w: Winner) => w.email === email)
    const newWinner: Winner = {
      name: String(name),
      email: String(email),
      time: String(time),
      retries: Number(retries),
      totalTime: Number(totalTime),
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
    console.error('Error adding winner:', error)
    return NextResponse.json({ error: 'Failed to add winner' }, { status: 500 })
  }
} 
