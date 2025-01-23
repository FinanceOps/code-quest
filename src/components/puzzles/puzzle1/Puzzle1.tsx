import { Box, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { setStatus, states } from '../../../slices/puzzleSlice'
import Button from '../../common/Button/Button'
import { usePuzzle } from '../../../hooks/usePuzzle'
import { setTitle } from '../../../slices/headerSlice'
import { setTimer } from '../../../slices/footerSlice'
import GiphyImage from '../../common/GiphyImage/GiphyImage'
import Layout from '../../Layout/Layout'
import { store } from '../../../redux/store'

const Puzzle1 = () => {
  const dispatch = useDispatch()

  const { status } = useSelector((state: any) => state.puzzle)

  const [answer, setAnswer] = useState('')

  const { next, retry, success, failure } = usePuzzle()

  const secret = useRef(`${Math.floor(Math.random() * 1000000)}`)

  useEffect(() => {
    if (status === states.IN_PROGRESS) {
      dispatch(setTitle('Puzzle 1: Find the hidden key'))
      
      dispatch(setTimer(120))
      
      const interval = setInterval(() => {
        const currentTimer = (store.getState() as any).footer.timer
        
        if (currentTimer <= 1) {
          clearInterval(interval)
          dispatch(setStatus(states.FAILURE))
        } 
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [status, dispatch])

  const onClick = (event: any) => {
    event.preventDefault()
    if (answer === secret.current) {
      success()
    } else {
      failure()
    }
  }

  const inputElements = () => {
    switch (status) {
      case states.SUCCESS: {
        return <Button onClick={next}>Next</Button>
      }
      case states.FAILURE: {
        return <Button onClick={retry}>Retry</Button>
      }
      default: {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <TextField
              disabled
              name="answer"
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
              placeholder="enter the key"
            />
            <Box>
              <Button onClick={onClick}>Submit</Button>
            </Box>
          </Box>
        )
      }
    }
  }

  return (
    <Layout>
      <Box className='secret' style={{ display: 'none' }}>{secret.current}</Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',
        flex: 1,  // Added flex grow
        height: '100%'  // Take full height
      }}>
        <GiphyImage width={1000} height={500} />
      </Box>
      {inputElements()}
    </Layout>
  )
}

export default Puzzle1
