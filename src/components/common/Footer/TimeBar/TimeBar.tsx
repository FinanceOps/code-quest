'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setStatus, states } from '../../../../slices/puzzleSlice'
import { setTimer } from '../../../../slices/footerSlice'
import { useEffect, useRef } from 'react'
import { RootState } from '@/redux/store'
import { Box, Typography } from '@mui/material'

const TimeBar = () => {
  const dispatch = useDispatch()
  const timer = useSelector((state: RootState) => state.footer.timer)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        dispatch(setTimer(timer - 1))
        
        if (timer <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          dispatch(setStatus(states.FAILURE))
        }
      }, 1000)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [timer, dispatch])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBarColor = (percentage: number) => {
    if (percentage <= 10) return '#ff4444'
    if (percentage <= 50) return '#ffb247'
    return '#ffffff'
  }

  const percentage = (timer / 180) * 100

  return (
    <Box sx={{ width: '100%', position: 'relative', p:1, }}>
      <Box
        sx={{
          width: '100%',
          height: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: getBarColor(percentage),
            transition: 'all 1s linear',
            borderRadius: '4px'
          }}
        />
      </Box>
      <Typography 
        sx={{ 
          position: 'absolute',
          top: '-24px',
          right: '16px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        {formatTime(timer)}
      </Typography>
    </Box>
  )
}

export default TimeBar
