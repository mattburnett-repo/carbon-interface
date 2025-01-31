import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'

import { tokens } from '../../../theme'

import FuelCombustionForm from './FuelCombustionForm'
import FuelCombustionEstimate from './FuelCombustionEstimate'
import { type iFormInitialValues } from './types'

interface LocationState {
  state: { values: iFormInitialValues } | null
}

const FuelCombustion = (): JSX.Element => {
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
      <FuelCombustionForm />
      {location.state?.values !== undefined && (
        <FuelCombustionEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default FuelCombustion
