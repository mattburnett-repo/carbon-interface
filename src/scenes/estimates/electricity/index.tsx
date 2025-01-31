import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'

import { tokens } from '../../../theme'

import ElectricityForm from './ElectricityForm'
import ElectricityEstimate from './ElectricityEstimate'
import { iInitialValues } from './types'

type LocationState = {
  values: iInitialValues;
}

const Electricity = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const location = useLocation() as { state: LocationState | null }
  const initialValues: iInitialValues | undefined = location.state?.values

  const handleSubmit = (values: iInitialValues): void => {
    // Handle form submission
    console.log('Form submitted:', values)
  }

  const defaultValues: iInitialValues = {
    type: 'electricity',
    electricity_value: 1,
    electricity_unit: 'kwh' as const,
    country: 'us',
    state: 'ca'
  } as const

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
      {!initialValues ? (
        <ElectricityForm
          onSubmit={handleSubmit}
          initialValues={defaultValues}
        />
      ) : (
        <ElectricityEstimate 
          estimateValues={initialValues}
        />
      )}
    </Box>
  )
}

export default Electricity
