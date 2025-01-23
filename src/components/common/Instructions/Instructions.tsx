import React from 'react'
import { Box, List, ListItem } from '@mui/material'

interface Props {
  steps: string[]
}

const Instructions = ({ steps }: Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        minWidth: '480px',
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        fontSize: '1.3rem',
        borderRadius: '1rem',
        p: 6
      }}
    >
      <List>
        {steps.map((step, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'list-item',
              listStyleType: 'decimal'
            }}
          >
            {step}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Instructions 
