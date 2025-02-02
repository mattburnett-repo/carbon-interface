import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import ElectricityForm from './ElectricityForm'
import ElectricityEstimate from './ElectricityEstimate'
import { type iInitialValues } from './types'
import { defaultElectricityValues } from './defaults'

const Electricity = (): JSX.Element => {
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
      <ElectricityForm onSubmit={handleSubmit} initialValues={defaultElectricityValues} />
      {estimateValues && <ElectricityEstimate estimateValues={estimateValues} />}
    </Box>
  )
}

export default Electricity
