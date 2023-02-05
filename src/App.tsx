import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import './styles/index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./theme file, later)
import { ColorModeContext, useMode } from './theme'
// @ts-expect-error (fix this by typing Topbar file, later)
import Topbar from './scenes/global/Topbar'
// @ts-expect-error (fix this by typing Sidebar file, later)
import Sidebar from './scenes/global/Sidebar'

import Dashboard from './scenes/dashboard'
import Electricity from './scenes/estimates/electricity'
import Flight from './scenes/estimates/flight'
import Shipping from './scenes/estimates/shipping'
import Vehicle from './scenes/estimates/vehicle'
import FuelCombustion from './scenes/estimates/fuel-combustion'
import Estimate from './scenes/estimates/estimate'

// TODO: remember to delete these, along with thier route/s
// import LoadingDisplay from './components/LoadingDisplay'
import ErrorDisplay from './components/ErrorDisplay'

const queryClient = new QueryClient()

//  TODO: lazy loading / Suspense
const App = (): JSX.Element => {
  const [theme, colorMode] = useMode()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            <Sidebar />
            <main className='content'>
              <Topbar />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route
                  path='/estimates/electricity'
                  element={<Electricity />}
                />
                <Route path='/estimates/flight' element={<Flight />} />
                <Route path='/estimates/shipping' element={<Shipping />} />
                <Route path='/estimates/vehicle' element={<Vehicle />} />
                <Route
                  path='/estimates/fuel-combustion'
                  element={<FuelCombustion />}
                />
                <Route path='/estimates/estimate' element={<Estimate />} />
                <Route
                  path='/test'
                  element={<ErrorDisplay message='asdfasdf' />}
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  )
}

export default App
