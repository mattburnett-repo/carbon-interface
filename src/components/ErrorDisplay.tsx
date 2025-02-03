import { Box, Typography } from '@mui/material'

interface ErrorDisplayProps {
  error: {
    name: string;
    message: string;
  }
  requestData?: unknown  // Keep it generic
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: '5rem'
    }}>
      <Typography 
        variant="h5" 
        color="error"
        gutterBottom
        sx={{
          textAlign: 'center',
          wordBreak: 'break-word',
          maxWidth: '100%'
        }}
      >
        {error.name}
      </Typography>
      <Typography 
        variant="body1"
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
