'use client'

import React from 'react'
import { Box } from '@mui/material'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        p: 2,
        flexGrow: 1,
        maxWidth: '100vw',
      }}
    >
      {children}
    </Box>
  )
}

export default Layout
