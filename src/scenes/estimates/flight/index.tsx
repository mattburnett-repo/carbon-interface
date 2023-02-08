import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import FlightForm from './FlightForm'
import FlightEstimate from './FlightEstimate'

const Flight = (): JSX.Element => {
  const location = useLocation()

  return (
    <Box>
      <FlightForm />
      {location.state?.values !== undefined && (
        // spread the props: https://stackoverflow.com/questions/59969756/not-assignable-to-type-intrinsicattributes-intrinsicclassattributes-react-js
        <FlightEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default Flight
