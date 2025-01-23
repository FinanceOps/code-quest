import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timer: 0,
  completed: false,
}

export const footerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload
    },

    setCompleted: (state, action) => {
      state.completed = action.payload
    },
  },
})

export const { setTimer, setCompleted } = footerSlice.actions
export default footerSlice.reducer
