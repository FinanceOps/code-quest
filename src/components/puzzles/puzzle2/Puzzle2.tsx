import { Box, Grid, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePuzzle } from '../../../hooks/usePuzzle'
import { setTimer } from '../../../slices/footerSlice'
import { setTitle } from '../../../slices/headerSlice'
import { states } from '../../../slices/puzzleSlice'
import Button from '../../common/Button/Button'
import GiphyImage from '../../common/GiphyImage/GiphyImage'
import Layout from '../../Layout/Layout'
import AmongUs from './AmongUs/AmongUs'

const colors = [
  'black',
  'brown',
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
]

const Puzzle2 = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: any) => state.puzzle)
  const [answer, setAnswer] = useState('')
  const { next, retry, success, failure } = usePuzzle()
  const randomIndex = useRef(Math.floor(Math.random() * colors.length))

  useEffect(() => {
    if (status === states.IN_PROGRESS) {
      dispatch(setTitle('Puzzle 2: Someone Among Us is slowing us down'))
      dispatch(setTimer(180))
    }
  }, [status, dispatch])

  const onClick = () => {
    if (colors[randomIndex.current].toLowerCase() === answer?.toLowerCase()) {
      success()
    } else {
      failure()
    }
  }

  const inputElements = () => {
    switch (status) {
      case states.SUCCESS:
        return <Button onClick={next}>Next</Button>
      case states.FAILURE:
        return <Button onClick={retry}>Retry</Button>
      default:
        return (
          <>
            <Grid
              container
              sx={{
                p: 2,
                maxWidth: '600px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                justifyContent: 'center'
              }}
            >
              {colors.map((color, index) => (
                <Box
                  key={color}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255)',
                    border: '1px solid rgba(0, 0, 0, 0.8)',
                    p: 3,
                    fontSize: '30px',
                    textAlign: 'center',
                    animation: index % 2 === 0 ? 'wobble1 4s linear infinite' : 'wobble2 4s linear infinite',
                    '@keyframes wobble1': {
                      '0%': { transform: 'translateX(0%)' },
                      '12%': { transform: 'translateX(-2%) rotate(-2deg)' },
                      '30%': { transform: 'translateX(2%) rotate(2deg)' },
                      '42%': { transform: 'translateX(-2%) rotate(-2deg)' },
                      '60%': { transform: 'translateX(2%) rotate(2deg)' },
                      '72%': { transform: 'translateX(-2%) rotate(-2deg)' }
                    },
                    '@keyframes wobble2': {
                      '0%': { transform: 'translateX(0%)' },
                      '12%': { transform: 'translateX(2%) rotate(2deg)' },
                      '30%': { transform: 'translateX(-2%) rotate(-2deg)' },
                      '42%': { transform: 'translateX(2%) rotate(2deg)' },
                      '60%': { transform: 'translateX(-2%) rotate(-2deg)' },
                      '72%': { transform: 'translateX(2%) rotate(2deg)' }
                    }
                  }}
                >
                  <AmongUs color={color} index={index} randomIndex={randomIndex.current} />
                </Box>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextField
                name="color"
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                sx={{
                  m: 2,
                  width: '50%',
                  '& .MuiInputBase-root': {
                    p: 2,
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                  }
                }}
                placeholder="enter the color"
              />
              <Button onClick={onClick}>Submit</Button>
            </Box>
          </>
        )
    }
  }

  return (
    <Layout>
      {status !== states.IN_PROGRESS ? <GiphyImage /> : <></>}
      {inputElements()}
    </Layout>
  )
}

export default Puzzle2
