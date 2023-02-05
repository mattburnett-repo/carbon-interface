import React from 'react'

// TODO: needs MUI / styling
import { Box, Typography } from '@mui/material'

const ErrorDisplay = (message: any): JSX.Element => {
  return (
    <Box className='estimate' padding={'5rem'}>
      <Typography variant={'h1'}>Error</Typography>
      {/* FIXME: type and implement message */}
      {/* <Typography variant={'h2'}>Message: {message}</Typography> */}
    </Box>
  )
}

export default ErrorDisplay
