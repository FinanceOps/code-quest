import { Box, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useCallback } from 'react'
import { states, setPlantBombWire, clearWires } from '../../../slices/puzzleSlice'
import Button from '../../common/Button/Button'
import { usePuzzle } from '../../../hooks/usePuzzle'
import { setTitle } from '../../../slices/headerSlice'
import { setTimer } from '../../../slices/footerSlice'
import Instructions from '../../common/Instructions/Instructions'
import GiphyImage from '../../common/GiphyImage/GiphyImage'
import Layout from '../../Layout/Layout'

const steps = [
  'Some mischievous pirates have planted a bomb on your ship',
  'You found the bomb in time, but you need to defuse it',
  'You need to cut the wires in the opposite order of how they were attached',
  'If you get the sequence wrong or the timers expire, then KABOOM!',
  'As an example if you cut the 2nd wire, you enter 2 and so on...',
  'Hurry Up! Tick, tick, tick...',
]

const Puzzle4 = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: any) => state.puzzle)
  const wires = [1, 2, 3, 4, 5, 6]

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const secret = useRef(shuffleArray(wires).join(''))
  const [answer, setAnswer] = useState('')
  const { next, retry, success, failure } = usePuzzle()
  const [initialized, setInitialized] = useState(false)

  const plantBomb = useCallback((order: string) => {
    const wireOrder = order.split('').reverse()
    wireOrder.forEach((wire: string) => {
      dispatch(setPlantBombWire(btoa(wire)))
    })
  }, [dispatch])

  useEffect(() => {
    if (status === states.IN_PROGRESS && !initialized) {
      dispatch(setTitle('Puzzle 4: Defuse the bomb'))
      dispatch(setTimer(180))
      dispatch(clearWires())
      plantBomb(secret.current)
      setInitialized(true)
    }
  }, [status, dispatch, plantBomb, initialized])

  const cutWire = (wire: string) => {
    setAnswer(wire)
    if (secret.current.indexOf(wire) !== 0) {
      failure()
    } else {
      if (secret.current === wire) {
        success()
      }
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <TextField
              name="answer"
              type="number"
              value={answer}
              onChange={(event) => cutWire(event.target.value)}
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
              placeholder="enter the sequence of wires"
            />
          </Box>
        )
    }
  }

  return (
    <Layout>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex'
        }}
      >
        <GiphyImage />
        {status === states.IN_PROGRESS && <Instructions steps={steps} />}
      </Box>
      {inputElements()}
    </Layout>
  )
}

export default Puzzle4
