import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'

// @ts-expect-error type this
import { tokens } from '../../../theme'

import FuelCombustionForm from './FuelCombustionForm'
import FuelCombustionEstimate from './FuelCombustionEstimate'

const FuelCombustion = (): JSX.Element => {
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
      <FuelCombustionForm />
      {location.state?.values !== undefined && (
        <FuelCombustionEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default FuelCombustion
