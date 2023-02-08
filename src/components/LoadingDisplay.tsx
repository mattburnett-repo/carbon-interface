import React from 'react'

import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

const LoadingDisplay = (): JSX.Element => {
  return (
    <Box width={'75%'} margin={'auto'} marginTop={'5px'}>
      <LinearProgress color='secondary' />
    </Box>
  )
}

export default LoadingDisplay
