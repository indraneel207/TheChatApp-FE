import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardContainer from '../../screens/Dashboard/DashboardContainer'
import StartContainer from '../../screens/Start/StartContainer'
import PrivateRoute from './PrivateRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <DashboardContainer />
            </PrivateRoute>
          }
        />
        <Route path='/' element={<StartContainer />} />
      </Routes>
    </BrowserRouter>
  )
}
