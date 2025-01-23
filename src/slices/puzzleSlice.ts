import { createSlice } from '@reduxjs/toolkit'

export enum states {
  'IN_PROGRESS',
  'SUCCESS',
  'FAILURE',
}

type State = { status: states; id: number; wires: number[] }

const initialState: State = {
  status: states.IN_PROGRESS,
  id: 1,
  wires: [],
}

export const puzzleSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return { ...state, status: action.payload }
    },
    setPuzzle: (state, action) => {
      return {
        ...state,
        id: action.payload,
        status: states.IN_PROGRESS,
        wires: [],
      }
    },
    clearWires: (state) => {
      return {
        ...state,
        wires: [],
      }
    },
    setPlantBombWire: (state, action) => {
      return {
        ...state,
        wires: [...state.wires, action.payload],
      }
    },
  },
})

export const { setStatus, setPuzzle, clearWires, setPlantBombWire } = puzzleSlice.actions
export default puzzleSlice.reducer
