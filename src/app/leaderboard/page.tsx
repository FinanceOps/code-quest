'use client'

import { Box } from '@mui/material'
import LeaderBoard from '../../components/leaderboard/LeaderBoard'

export default function LeaderBoardPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/bg/4.jpg")',
        backgroundSize: 'cover',
        display: 'flex',
        p:4,
        justifyContent: 'center'
      }}
    >
      <LeaderBoard />
    </Box>
  )
} 
