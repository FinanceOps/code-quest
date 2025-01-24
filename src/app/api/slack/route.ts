import { NextRequest, NextResponse } from 'next/server'

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

export async function POST(request: NextRequest) {
  try {
    if (!SLACK_WEBHOOK_URL) {
      console.warn('Slack webhook URL not configured')
      return NextResponse.json({ message: 'Webhook not configured' }, { status: 200 })
    }

    const { name, email } = await request.json()

    const message = {
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": `🎮 New Challenge Started! 🎮`,
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*Name:*\n${name}`
            },
            {
              "type": "mrkdwn",
              "text": `*Email:*\n${email}`
            },
            {
              "type": "mrkdwn",
              "text": `*Started At:*\n${new Date().toLocaleString()}`
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

    return NextResponse.json({ message: 'Notification sent' })
  } catch (error) {
    console.error('Error sending Slack notification:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
} 
