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

// In-memory storage for winners
const winnersData: { winners: Winner[] } = { winners: [] }

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

async function sendSlackNotification(winner: Winner) {
  try {
    const formattedTime = winner.time.includes(':') ? winner.time : `${Math.floor(parseInt(winner.time) / 60)}:${(parseInt(winner.time) % 60).toString().padStart(2, '0')}`
    
    const message = {
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": `🎉 ${winner.name} has completed the puzzle! 🎉`,
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*Email:*\n${winner.email}`
            },
            {
              "type": "mrkdwn",
              "text": `*Completion Time:*\n${formattedTime}`
            },
            {
              "type": "mrkdwn",
              "text": `*Number of Retries:*\n${winner.retries}`
            },
            {
              "type": "mrkdwn",
              "text": `*Total Time Spent:*\n${Math.round(winner.totalTime / 60)} minutes`
            },
            {
              "type": "mrkdwn",
              "text": `*Completed At:*\n${new Date(winner.completedAt).toLocaleString()}`
            }
          ]
        }
      ]
    }

    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })
  } catch (error) {
    console.error('Error sending Slack notification:', error)
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('x-admin-password')
    
    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return sanitized winners directly from memory
    const sanitizedWinners = winnersData.winners.map((winner: Winner) => ({
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
    
    // Find existing entry by email
    const existingIndex = winnersData.winners.findIndex((w: Winner) => w.email === email)
    const newWinner: Winner = {
      name: String(name),
      email: String(email),
      time: String(time),
      retries: Number(retries),
      totalTime: Number(totalTime),
      completedAt: new Date().toISOString()
    }
    
    if (existingIndex >= 0) {
      winnersData.winners[existingIndex] = newWinner // Update existing entry
    } else {
      winnersData.winners.push(newWinner) // Add new entry
    }
    
    // Send Slack notification
    await sendSlackNotification(newWinner)
    
    return NextResponse.json(newWinner)
  } catch (error) {
    console.error('Error adding winner:', error)
    return NextResponse.json({ error: 'Failed to add winner' }, { status: 500 })
  }
}
