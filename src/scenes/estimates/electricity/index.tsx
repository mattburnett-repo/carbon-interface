import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import ElectricityForm from './ElectricityForm'
import ElectricityEstimate from './ElectricityEstimate'

const Electricity = (): JSX.Element => {
  const location = useLocation()
  // const theData = location.state?.values

  return (
    <Box>
      <ElectricityForm />
      {location.state?.values !== undefined && (
        <ElectricityEstimate theData={location.state.values} />
      )}
    </Box>
  )
}

export default Electricity
