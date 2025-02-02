import React from 'react'
import { Box, LinearProgress } from '@mui/material'

const LoadingDisplay = () => {
  return (
    <Box data-testid="loading-container" sx={{ width: '75%', margin: '5px auto auto auto' }}>
      <LinearProgress />
    </Box>
  )
}

export default LoadingDisplay
