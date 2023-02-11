import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import './styles/index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

// @ts-expect-error type this
import { ColorModeContext, useMode } from './theme'
// @ts-expect-error type this
import Topbar from './scenes/global/Topbar'
// @ts-expect-error type this
import Sidebar from './scenes/global/Sidebar'

import Dashboard from './scenes/dashboard'
import LoadingDisplay from './components/LoadingDisplay'

const Electricity = lazy(
  async () => await import('./scenes/estimates/electricity')
)
const Flight = lazy(async () => await import('./scenes/estimates/flight'))
const Shipping = lazy(async () => await import('./scenes/estimates/shipping'))
const Vehicle = lazy(async () => await import('./scenes/estimates/vehicle'))
const FuelCombustion = lazy(
  async () => await import('./scenes/estimates/fuel_combustion')
)
const Estimate = lazy(async () => await import('./scenes/estimates/estimate'))

const queryClient = new QueryClient()

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
              <Suspense fallback={<LoadingDisplay />}>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  {/* <Route path='/test' element={<LoadingDisplay />} /> */}
                  <Route
                    path='/estimates/electricity'
                    element={<Electricity />}
                  />
                  <Route path='/estimates/flight' element={<Flight />} />
                  <Route path='/estimates/shipping' element={<Shipping />} />
                  <Route path='/estimates/vehicle' element={<Vehicle />} />
                  <Route
                    path='/estimates/fuel_combustion'
                    element={<FuelCombustion />}
                  />
                  <Route path='/estimates/estimate' element={<Estimate />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  )
}

export default App
