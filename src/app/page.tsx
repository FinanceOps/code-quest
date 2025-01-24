import StoreProvider from '../components/StoreProvider'
import HomeContent from './HomeContent'

export default function Home() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  )
}
