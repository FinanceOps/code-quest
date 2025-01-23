import { configureStore } from '@reduxjs/toolkit'
import headerReducer from '../slices/headerSlice'
import footerReducer from '../slices/footerSlice'
import puzzleReducer from '../slices/puzzleSlice'

const initialState = {
  puzzle: {
    status: 0,
    id: 1,
    wires: [],
  },
  header: {
    title: '',
  },
  footer: {
    timer: 0,
    completed: false,
  },
}

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    header: headerReducer,
    footer: footerReducer,
    puzzle: puzzleReducer,
  },
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
})
