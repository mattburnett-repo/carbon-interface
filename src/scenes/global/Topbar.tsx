import React, { useContext } from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import ladderIcon from '../../assets/ladderIcon_01.png'
import { ColorModeContext, tokens } from '../../theme'

const Topbar = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  return (
    <Box 
      component="header"
      role="banner"
      aria-label="Top Navigation"
      sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        p: 2, 
        bgcolor: colors.primary[400],
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        mr: '3rem', 
        mt: '1rem', 
        mb: '1rem', 
        gap: '40px',
        '& a:hover img': {
          transform: 'scale(1.15)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        },
        '& button:hover': {
          backgroundColor: `${colors.primary[300]}40 !important`,
          transform: 'scale(1.7)'
        }
      }}>
        <a 
          href='https://mattburnett-repo.github.io/portfolio-website/'
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Portfolio Website"
          style={{ transition: 'all 0.3s ease-in-out' }}
        >
          <img
            alt='Portfolio Icon'
            width='35px'
            height='35px'
            src={ladderIcon}
            style={{ 
              cursor: 'pointer', 
              borderRadius: '50%',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        </a>
        <IconButton 
          onClick={colorMode.toggleColorMode} 
          aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}
          sx={{ 
            transform: 'scale(1.5)',
            transition: 'all 0.3s ease-in-out',
            '&:focus-visible': {
              outline: `2px solid ${colors.grey[100]}`,
              outlineOffset: '2px'
            }
          }}
        >
          {theme.palette.mode === 'dark' ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar 