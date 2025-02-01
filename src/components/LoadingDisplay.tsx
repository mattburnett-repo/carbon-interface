import React from 'react'
import { Box, LinearProgress } from '@mui/material'

const LoadingDisplay: React.FC = () => {
  return (
    <Box sx={{ width: '100%', mt: '5rem' }}>
      <LinearProgress color="secondary" />
    </Box>
  )
}

export default LoadingDisplay
