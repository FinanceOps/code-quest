import React from 'react'
import { Box } from '@mui/material'
import { usePuzzle } from '../../../hooks/usePuzzle'

type GiphyImageProps = {
  width?: number
  height?: number
}

const GiphyImage = ({ width = 100, height = 100 }: GiphyImageProps) => {
  const { imgSrc } = usePuzzle()
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <img  
        src={imgSrc()}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </Box>
  )
}

export default GiphyImage
