import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import VehicleForm from './VehicleForm'
import VehicleEstimate from './VehicleEstimate'

const Vehicle = (): JSX.Element => {
  const location = useLocation()

  return (
    <Box>
      <VehicleForm />
      {location.state?.values !== undefined && (
        <VehicleEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default Vehicle
