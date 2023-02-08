import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import ShippingForm from './ShippingForm'
import ShippingEstimate from './ShippingEstimate'

const Shipping = (): JSX.Element => {
  const location = useLocation()

  return (
    <Box>
      <ShippingForm />
      {location.state?.values !== undefined && (
        // spread the props: https://stackoverflow.com/questions/59969756/not-assignable-to-type-intrinsicattributes-intrinsicclassattributes-react-js
        <ShippingEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default Shipping
