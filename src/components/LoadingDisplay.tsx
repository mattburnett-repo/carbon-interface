import React from 'react'

import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

const LoadingDisplay = (): JSX.Element => {
  return (
    <Box className='estimate' padding={'5rem'}>
      <Typography variant='h1' mb={'3rem'}>
        Loading...
      </Typography>
      <LinearProgress color='secondary' />
    </Box>
  )
}

export default LoadingDisplay
