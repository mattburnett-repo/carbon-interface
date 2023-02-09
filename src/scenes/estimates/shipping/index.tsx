import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'
//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import { tokens } from '../../../theme'

import ShippingForm from './ShippingForm'
import ShippingEstimate from './ShippingEstimate'

const Shipping = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const location = useLocation()

  return (
    <Box
      sx={{
        m: 'auto',
        height: '89vh',
        alignContent: 'center',
        justifyContent: 'center',
        p: '30px',
        backgroundColor: colors.primary[400]
      }}
    >
      <ShippingForm />
      {location.state?.values !== undefined && (
        <ShippingEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default Shipping
