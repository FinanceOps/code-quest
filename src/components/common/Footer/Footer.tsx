'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { states } from '../../../slices/puzzleSlice'
import TimeBar from './TimeBar/TimeBar'
import { Box } from '@mui/material'
import { RootState } from '../../../redux/store'

const Footer = () => {
  const { status } = useSelector((state: RootState) => state.puzzle)

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
      }}
    >
      {status === states.IN_PROGRESS ? <TimeBar /> : null}
    </Box>
  )
}

export default Footer
