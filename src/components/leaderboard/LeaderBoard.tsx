'use client'

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Button from '../common/Button/Button'

interface Winner {
  name: string
  email: string
  time: string
  completedAt: string
  retries: number
  totalTime: number
}

export default function LeaderBoard() {
  const [winners, setWinners] = useState<Winner[]>([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard', {
        headers: {
          'x-admin-password': password
        }
      })
      
      if (response.status === 401) {
        setError('Invalid password')
        return
      }
      
      const data = await response.json()
      setWinners(data)
      setIsAuthenticated(true)
    } catch (err) {
      setError('Failed to fetch leaderboard')
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          p: 4,
          borderRadius: 2,
          color: 'white',
          width: '90%',
          maxWidth: '400px'
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Admin Access Required
        </Typography>
        <TextField
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          sx={{ 
            mb: 2,
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
            }
          }}
        />
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button onClick={fetchLeaderboard}>Access Leaderboard</Button>
      </Box>
    )
  }

  return (
    <TableContainer 
      component={Paper}
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '80vh'
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Rank</TableCell>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Name</TableCell>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Email</TableCell>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Completion Time</TableCell>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Total Time</TableCell>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Retries</TableCell>
            <TableCell sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.9)' }}>Completed On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {winners.map((winner, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: 'white' }}>{index + 1}</TableCell>
              <TableCell sx={{ color: 'white' }}>{winner.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{winner.email}</TableCell>
              <TableCell sx={{ color: 'white' }}>{winner.time}</TableCell>
              <TableCell sx={{ color: 'white' }}>{formatTime(winner.totalTime)}</TableCell>
              <TableCell sx={{ color: 'white' }}>{winner.retries}</TableCell>
              <TableCell sx={{ color: 'white' }}>{formatDate(winner.completedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
