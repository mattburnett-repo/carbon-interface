import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import ShippingForm from './ShippingForm'
import ShippingEstimate from './ShippingEstimate'
import { type iInitialValues } from './types'
import { EstimateLayout } from '../../layout/EstimateLayout'

// Add fadeIn keyframe animation
const fadeIn = {
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}

const Shipping = (): JSX.Element => {
  const [estimateValues, setEstimateValues] = useState<iInitialValues | null>(null)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const handleSubmit = (values: iInitialValues) => {
    setEstimateValues(values)
  }

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
      <EstimateLayout
        formSection={<ShippingForm onSubmit={handleSubmit} />}
        displaySection={<ShippingEstimate estimateValues={estimateValues} />}
      />
    </Box>
  )
}

export default Shipping
