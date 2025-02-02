import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'

import VehicleForm from './VehicleForm'
import VehicleEstimate from './VehicleEstimate'
import { iInitialValues } from './types'

interface LocationState {
  state: {
    values: iInitialValues
  } | null
}

const Vehicle = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const location = useLocation() as unknown as LocationState

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
      <VehicleForm />
      {location.state?.values !== undefined && (
        <VehicleEstimate />
      )}
    </Box>
  )
}

export default Vehicle

export { VehicleForm, VehicleEstimate }
