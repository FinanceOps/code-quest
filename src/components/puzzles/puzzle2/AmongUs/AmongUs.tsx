import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface AmongUsProps {
  color: string
  index: number
  randomIndex: number
}

const AmongUs = ({ color, index, randomIndex }: AmongUsProps) => {
  const [, setTick] = useState(0)

  useEffect(() => {
    if (index === randomIndex) {
      const interval = setInterval(() => {
        setTick(tick => tick + 1) // Force a rerender by updating state
      }, 100)
      
      return () => {
        clearInterval(interval)
      }
    }
  }, [index, randomIndex]) // Add dependencies to useEffect

  return (
    <Box key={color}>
      <Image
        src={`/puzzle2/${color}.jpg`}
        width={70}
        height={70}
        alt={color}
      />
    </Box>
  )
}

export default AmongUs
