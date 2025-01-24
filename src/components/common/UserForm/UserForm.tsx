'use client'

import { Box, TextField } from '@mui/material'
import Button from '../Button/Button'
import { useState } from 'react'

interface UserFormProps {
  onSubmit: (name: string, email: string) => void
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    try {
      // Send notification to Slack
      await fetch('/api/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
      })
      
      // Call the original onSubmit
      onSubmit(name, email)
    } catch (error) {
      console.error('Error sending start notification:', error)
      // Still continue with the challenge even if notification fails
      onSubmit(name, email)
    }
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      width: '100%',
      maxWidth: '500px',
      p: 4,
      bgcolor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 2
    }}>
      <TextField
        fullWidth
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        fullWidth
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        sx={{ input: { color: 'white' } }}
      />
      <Button 
        onClick={handleSubmit}
        disabled={!name || !email}
      >
        Start Challenge
      </Button>
    </Box>
  )
} 
