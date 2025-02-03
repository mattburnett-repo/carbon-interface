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
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: colors.primary[400],
      }}
    >
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    </Box>
  )
}

export default LoadingDisplay
