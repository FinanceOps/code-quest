import { useDispatch, useSelector } from 'react-redux'
import { setPuzzle, setStatus, states } from '../slices/puzzleSlice'
import { setTitle } from '../slices/headerSlice'
import { setTimer } from '../slices/footerSlice'

export const usePuzzle = () => {
  const dispatch = useDispatch()

  const { id, status } = useSelector((state: any) => state.puzzle)

  const imgSrc = () => {
    if (status === states.FAILURE) {
      return `/puzzle${id}/failure.gif`
    } else if (status === states.SUCCESS) {
      return `/puzzle${id}/success.gif`
    } else {
      return `/puzzle${id}/main.gif`
    }
  }

  const next = () => {
    dispatch(setPuzzle(id + 1))
  }

  const retry = () => {
    location.reload()
  }

  const success = () => {
    dispatch(setStatus(states.SUCCESS))
    dispatch(setTitle('Congratulations!'))
    dispatch(setTimer(0))
  }

  const failure = () => {
    dispatch(setStatus(states.FAILURE))
    dispatch(setTitle('Oh! Shoot, Try Again!'))
    dispatch(setTimer(0))
  }

  return {
    imgSrc,
    next,
    retry,
    success,
    failure,
  }
}
