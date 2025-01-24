'use client'

import { store } from '../redux/store'
import { Provider } from 'react-redux'
import ThemeRegistry from './ThemeRegistry'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </Provider>
  )
} 
