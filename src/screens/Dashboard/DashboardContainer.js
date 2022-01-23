import { useStoreState } from 'easy-peasy'
import React from 'react'
import Dashboard from './views/Dashboard'


function DashboardContainer() {
  const store = useStoreState((state) => state)
  return <Dashboard store={store}/>
}

export default DashboardContainer
