import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import FlightForm from './FlightForm'
import FlightEstimate from './FlightEstimate'
import { EstimateLayout } from '../../layout/EstimateLayout'
import { type iFlightFormFields } from './types'

interface LocationState {
  values: iFlightFormFields
}

const Flight = (): JSX.Element => {
  const [estimateValues, setEstimateValues] = useState<iFlightFormFields | null>(null)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const handleSubmit = (values: iFlightFormFields) => {
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
        backgroundColor: colors.primary[400],
        transition: 'background-color 0.3s ease-in-out'
      }}
    >
      <EstimateLayout
        formSection={<FlightForm onSubmit={handleSubmit} />}
        displaySection={<FlightEstimate estimateValues={estimateValues} />}
      />
    </Box>
  )
}

export default Flight
