import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'

// @ts-expect-error type this
import { tokens } from '../../../theme'

import ElectricityForm from './ElectricityForm'
import ElectricityEstimate from './ElectricityEstimate'

const Electricity = (): JSX.Element => {
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
      <ElectricityForm />
      {location.state?.values !== undefined && (
        <ElectricityEstimate {...location.state.values} />
      )}
    </Box>
  )
}

export default Electricity
