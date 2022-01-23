import { StoreProvider, useStoreRehydrated } from 'easy-peasy'
import ErrorBoundary from './components/ErrorBoundary'
import AppRouter from './components/Router'
import store from './utils/Redux'
import Loader from './components/Loader'
import './App.css'

function App() {
  function WaitForStateRehydration({ children }) {
    const isRehydrated = useStoreRehydrated()
    return isRehydrated ? children : <Loader />
  }

  return (
    <div className='App'>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <WaitForStateRehydration>
            <AppRouter />
          </WaitForStateRehydration>
        </StoreProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
