import React from 'react'
import { Button as MuiButton } from '@mui/material'

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  children: React.ReactNode 
  disabled?: boolean
}

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        bgcolor: '#ffb247',
        color: 'black',
        px: 4,
        py: 2,
        m: 2,
        fontSize: '16px',
        borderRadius: '1rem',
        '&:hover': {
          bgcolor: '#ffa022'
        }
      }}
    >
      {children}
    </MuiButton>
  )
}

export default Button
