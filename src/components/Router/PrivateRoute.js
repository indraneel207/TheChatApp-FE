import { useStoreState } from 'easy-peasy'
import { Navigate } from 'react-router-dom'

const useAuth = () => useStoreState((state) => state.user.phone)

export default function PrivateRoute({ children }) {
  const auth = useAuth()
  return auth.val ? children : <Navigate to='/' />
}
