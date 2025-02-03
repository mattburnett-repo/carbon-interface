import { Box, Typography } from '@mui/material'

interface ErrorDisplayProps {
  error: {
    message: string
  }
}

const ErrorDisplay = ({ error }: ErrorDisplayProps): JSX.Element => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Typography 
        variant="h5" 
        color="error"
        sx={{
          textAlign: 'center',
          wordBreak: 'break-word',
          maxWidth: '100%'
        }}
      >
        {error.message}
      </Typography>
    </Box>
  )
}

export default ErrorDisplay
