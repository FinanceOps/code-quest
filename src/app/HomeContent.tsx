'use client'

import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from '../components/common/Header/Header'
import Footer from '../components/common/Footer/Footer'
import UserForm from '../components/common/UserForm/UserForm'
import Puzzle1 from '../components/puzzles/puzzle1/Puzzle1'
import Puzzle2 from '../components/puzzles/puzzle2/Puzzle2'
import Puzzle3 from '../components/puzzles/puzzle3/Puzzle3'
import Puzzle4 from '../components/puzzles/puzzle4/Puzzle4'
import Puzzle5 from '../components/puzzles/puzzle5/Puzzle5'
import { RootState } from '../redux/store'

export default function HomeContent() {
  const { id } = useSelector((state: RootState) => state.puzzle)
  const [mounted, setMounted] = useState(false)
  const [userStarted, setUserStarted] = useState(false)
  const [_, setStartTime] = useState<number>(0)

  useEffect(() => {
    setMounted(true)
    const started = localStorage.getItem('userStarted') === 'true'
    setUserStarted(started)
  }, [])

  if (!mounted) return null

  const handleStart = (name: string, email: string) => {
    localStorage.setItem('userName', name)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('startTime', Date.now().toString())
    localStorage.setItem('retries', '0')
    localStorage.setItem('userStarted', 'true')
    setStartTime(Date.now())
    setUserStarted(true)
  }


  const renderPuzzle = () => {
    switch (id) {
      case 1:
        return <Puzzle1 />
      case 2:
        return <Puzzle2 />
      case 3:
        return <Puzzle3 />
      case 4:
        return <Puzzle4 />
      case 5:
        return <Puzzle5 />
      default:
        return <Puzzle1 />
    }
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url("/bg/${id}.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Header />
      <Box sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', width: '100%', height: '100%' }}>
        {!userStarted ? (
          <UserForm onSubmit={handleStart} />
        ) : (
          renderPuzzle()
        )}
      </Box>
      <Footer />
    </Box>
  )
} 
