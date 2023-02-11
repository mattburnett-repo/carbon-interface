import React from 'react'

import { Box, Typography } from '@mui/material'

const ErrorDisplay = (errorProp: any): JSX.Element => {
  const { name, message } = errorProp.error

  return (
    <Box className='estimate' padding={'5rem'}>
      <Typography variant={'h1'} paddingBottom={'2rem'}>
        {name}
      </Typography>
      <Typography variant={'h2'}>{message}</Typography>
    </Box>
  )
}

export default ErrorDisplay
