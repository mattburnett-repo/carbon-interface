import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'

import { tokens } from '../../../theme'
import { type iInitialValues } from './types'

import ShippingForm from './ShippingForm'
import ShippingEstimate from './ShippingEstimate'

interface LocationState {
  state: { values: iInitialValues } | null
}

const Shipping = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const location = useLocation() as LocationState

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
