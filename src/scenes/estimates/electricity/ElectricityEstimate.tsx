import React from 'react'

import { Box, Typography } from '@mui/material'

interface iProps {
  theData: {
    type: string
    electricity_unit: string
    electricity_value: number
    country: string
    state?: string
  }
}

const ElectricityEstimate: React.FC<iProps> = (
  theData: iProps
): JSX.Element => {
  console.log('theData: ', theData)

  // FIXME: get rid of duplicate 'theData' in the incoming data object
  // FIXME: looks like this renders twice

  // TODO: run api call, etc. Try React Query

  return (
    <Box className='estimate'>
      <Typography
        variant={'h1'}
        sx={{
          textAlign: 'center',
          marginTop: '1rem',
          textTransform: 'capitalize'
        }}
      >
        {theData.theData.type} Estimate
      </Typography>
      <Box sx={{ margin: '0 auto', width: 'fit-content' }}>
        <Typography variant={'h2'} padding='1rem'>
          This data was sent
        </Typography>
        <Typography padding='0.5rem'>
          Unit: {theData.theData.electricity_unit}
        </Typography>
        <Typography padding='0.5rem'>
          Value: {theData.theData.electricity_value}
        </Typography>
        <Typography padding='0.5rem'>
          Country: {theData.theData.country}
        </Typography>
        <Typography padding='0.5rem'>State: {theData.theData.state}</Typography>
      </Box>
    </Box>
  )
}

export default ElectricityEstimate
