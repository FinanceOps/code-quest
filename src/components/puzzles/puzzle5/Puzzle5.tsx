import { Box, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { states } from '../../../slices/puzzleSlice'
import Button from '../../common/Button/Button'
import { usePuzzle } from '../../../hooks/usePuzzle'
import { setTitle } from '../../../slices/headerSlice'
import { setTimer } from '../../../slices/footerSlice'
import Instructions from '../../common/Instructions/Instructions'
import GiphyImage from '../../common/GiphyImage/GiphyImage'
import Layout from '../../Layout/Layout'
import { shuffle } from '../../../utils/array-utils'

type PuzzlePiece = typeof puzzlePieces[number]

const puzzlePieces = [
  'daa1838',
  'A859b4c',
  'Qc7299a',
  'cdce3e0',
  'cd3695d',
  'Y000f95',
  'Fd5d0e5',
  'Za4b53b',
  'ca7c9d7',
] as const

const puzzlePiecePositions: Record<PuzzlePiece, { top: number; left: number }> = {
  daa1838: { top: 0, left: 0 },
  A859b4c: { top: 0, left: 200 },
  Qc7299a: { top: 0, left: 400 },
  cdce3e0: { top: 200, left: 0 },
  cd3695d: { top: 200, left: 200 },
  Y000f95: { top: 200, left: 400 },
  Fd5d0e5: { top: 400, left: 0 },
  Za4b53b: { top: 400, left: 200 },
  ca7c9d7: { top: 400, left: 400 },
}

const steps = [
  'There is treasure hidden on the island',
  'You have to find the treasure and use it to pay your crew',
  'You have found a map but it is torn up',
  'Place the torn pieces in the correct places to fix the map',
  'You have successfully fixed the map and you can now use it to pay your crew',
]

const Puzzle5 = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: any) => state.puzzle)
  const { failure, success, retry } = usePuzzle()

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const generateInitialPositions = () => {
    return puzzlePieces.map(() => ({
      top: getRandomInt(400),
      left: getRandomInt(400)
    }))
  }

  const initialPositions = useRef(generateInitialPositions())

  useEffect(() => {
    if (status === states.IN_PROGRESS) {
      dispatch(setTitle('Puzzle 5: Jigsaw Puzzle'))
      dispatch(setTimer(600))
    }
  }, [status, dispatch])

  const checkSolution = () => {
    const allPiecesCorrect = puzzlePieces.every(piece => {
      const pieceElement = document.querySelector(`[data-key="${piece}"]`) as HTMLElement
      if (!pieceElement) return false

      const style = window.getComputedStyle(pieceElement)
      const currentTop = Math.round(parseFloat(style.top))
      const currentLeft = Math.round(parseFloat(style.left))
      const expectedPosition = puzzlePiecePositions[piece]

      const isCloseEnough = (actual: number, expected: number) => 
        Math.abs(actual - expected) <= 30

      return isCloseEnough(currentTop, expectedPosition.top) && 
             isCloseEnough(currentLeft, expectedPosition.left)
    })

    if (allPiecesCorrect) {
      handleSuccess()
    } else {
      failure()
    }
  }

  const handleSuccess = () => {
    const name = localStorage.getItem('userName') || ''
    const email = localStorage.getItem('userEmail') || ''
    const startTime = Number(localStorage.getItem('startTime') || Date.now())
    const retries = Number(localStorage.getItem('retries') || '0')
    const totalTime = Math.floor((Date.now() - startTime) / 1000)

    fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        time: localStorage.getItem('completionTime') || '10:00',
        retries,
        totalTime
      }),
    })
    .then(() => success())
    .catch(console.error)
  }

  const inputElements = () => {
    switch (status) {
      case states.SUCCESS:
        return (
          <Box
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              p: 4,
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '600px'
            }}
          >
            <Typography variant="body1" sx={{ mb: 3 }}>
              {`Thank you ${localStorage.getItem('userName')}! You've successfully completed all puzzles.`}
            </Typography>
            <Typography variant="body1">
              {`We'll review your performance and contact you at ${localStorage.getItem('userEmail')} soon.`} 
            </Typography>
          </Box>
        )
      case states.FAILURE:
        return <Button onClick={retry}>Retry</Button>
      default:
        return null
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    e.dataTransfer.setData('text/plain', target.getAttribute('data-key') || '')
  }

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const container = document.getElementById('jigsaw-container')
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const piece = e.dataTransfer.getData('text/plain')
    const pieceElement = document.querySelector(`[data-key="${piece}"]`) as HTMLElement
    if (pieceElement) {
      const adjustedX = Math.round(x - 100)
      const adjustedY = Math.round(y - 100)

      pieceElement.style.left = `${adjustedX}px`
      pieceElement.style.top = `${adjustedY}px`
    }
  }

  return (
    <Layout>
      {status === states.IN_PROGRESS ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 2
          }}
        >
          <Box
            id="jigsaw-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              position: 'relative',
              height: '631px',
              width: '631px',
              border: '16px solid black',
              bgcolor: 'white',
              flexShrink: 0
            }}
          >
            {shuffle(puzzlePieces).map((piece: PuzzlePiece, index: number) => (
              <Box
                component="img"
                src={`/puzzle5/${piece}.webp`}
                key={piece}
                draggable
                onDragStart={handleDragStart}
                sx={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  top: initialPositions.current[index].top,
                  left: initialPositions.current[index].left,
                  cursor: 'move',
                  userSelect: 'none',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.5)'
                  }
                }}
                data-key={piece}
                alt={piece}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Instructions steps={steps} />
            <Button onClick={checkSolution}>Check Solution</Button>
          </Box>
        </Box>
      ) : (
        <>
          <GiphyImage />
          {inputElements()}
        </>
      )}
    </Layout>
  )
}

export default Puzzle5
