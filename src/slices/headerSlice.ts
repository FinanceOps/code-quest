import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
  },
})

export const { setTitle } = headerSlice.actions
export default headerSlice.reducer
