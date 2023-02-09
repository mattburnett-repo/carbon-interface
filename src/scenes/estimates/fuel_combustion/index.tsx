import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import FuelCombustionForm from './FuelCombustionForm'
import FuelCombustionEstimate from './FuelCombustionEstimate'

const FuelCombustion = (): JSX.Element => {
  const location = useLocation()

  return (
    <Box>
      <FuelCombustionForm />
      {location.state?.values !== undefined && (
        <FuelCombustionEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default FuelCombustion
