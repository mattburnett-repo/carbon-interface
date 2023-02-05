import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import ElectricityForm from './ElectricityForm'
import ElectricityEstimate from './ElectricityEstimate'

const Electricity = (): JSX.Element => {
  const location = useLocation()

  return (
    <Box>
      <ElectricityForm />
      {location.state?.values !== undefined && (
        // spread the props: https://stackoverflow.com/questions/59969756/not-assignable-to-type-intrinsicattributes-intrinsicclassattributes-react-js
        <ElectricityEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default Electricity
