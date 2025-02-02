import React from 'react'
import { Box, LinearProgress, useTheme } from '@mui/material'
import { tokens } from '../theme'

const LoadingDisplay = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box 
      data-testid="loading-container" 
      sx={{ 
        width: '100%',  // Take full width
        margin: '5px auto auto auto',
        backgroundColor: colors.primary[400],
        height: '89vh',
        padding: '20px'  // Add some padding like other components
      }}
    >
      <LinearProgress />
    </Box>
  )
}

export default LoadingDisplay
