'use client'

import { Box, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { RootState } from '@/types/redux'

const Header = () => {
  const { title } = useSelector((state: RootState) => state.header)

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
        bgcolor: 'white',
        width: '100%',
        position: 'relative',
      }}>
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: 2,
            right: 2,
            fontSize: '0.7rem',
            color: '#999',
            userSelect: 'none'
          }}
        >
          v1.0.1
        </Box>
        <Image
          src="/common/logo.png"
          width={160}
          height={40}
          alt="Company Logo"
          priority
        />
        <Image
          src="/common/code-quest.png"
          width={300}
          height={40}
          alt="Code Quest Logo"
          priority
        />
      </Box>
      <Box
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          width: '100%',
          p: 2
        }}
      >
        {title}
      </Box>
    </Box>
  )
}

export default Header
