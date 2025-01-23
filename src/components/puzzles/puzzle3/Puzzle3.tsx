import { Box, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { states } from '../../../slices/puzzleSlice'
import Button from '../../common/Button/Button'
import { usePuzzle } from '../../../hooks/usePuzzle'
import { setTitle } from '../../../slices/headerSlice'
import { setTimer } from '../../../slices/footerSlice'
import Instructions from '../../common/Instructions/Instructions'
import GiphyImage from '../../common/GiphyImage/GiphyImage'
import Layout from '../../Layout/Layout'

const steps = [
  'You are stranded on an island, and you finally see a ship',
  'The ship is Posting a beacon signal',
  "The password is in the format 'HHMMSS'",
  'Find the time when the signal expires and enter it in the above format',
]

const Puzzle3 = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: any) => state.puzzle)
  const [answer, setAnswer] = useState('')
  const { next, retry, success, failure } = usePuzzle()
  const [token, setToken] = useState('')

  useEffect(() => {
    // Check localStorage first
    const storedToken = localStorage.getItem('beacon-token')
    if (storedToken) {
      setToken(storedToken)
    } else {
      // Only fetch new token if none exists
      fetch('/api/beacon')
        .then((response) => response.json())
        .then((data) => {
          setToken(data.token)
          localStorage.setItem('beacon-token', data.token)
        })
    }
  }, [])

  useEffect(() => {
    if (status === states.IN_PROGRESS) {
      dispatch(setTitle('Puzzle 3: Decode the signal'))
      dispatch(setTimer(120))
    }
  }, [status, dispatch])

  const onClick = () => {
    fetch('/api/beacon', {
      method: 'POST',
      headers: {
        'x-token': token,
        'x-answer': answer,
      },
    })
      .then((res) => {
        return res.json().then(data => {
          if (res.status === 200) {
            success()
          } else {
            failure()
          }
        })
      })
      .catch((error) => {
        console.error('Request error:', error)
        failure()
      })
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
            <Button onClick={onClick}>Submit</Button>
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

export default Puzzle3
