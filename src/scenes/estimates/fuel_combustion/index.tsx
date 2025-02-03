import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import FuelCombustionForm from './FuelCombustionForm'
import FuelCombustionEstimate from './FuelCombustionEstimate'
import { EstimateLayout } from '../../layout/EstimateLayout'
import { type iInitialValues } from './types'

const FuelCombustion = (): JSX.Element => {
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
        formSection={<FuelCombustionForm onSubmit={handleSubmit} />}
        displaySection={<FuelCombustionEstimate estimateValues={estimateValues} />}
      />
    </Box>
  )
}

export default FuelCombustion
