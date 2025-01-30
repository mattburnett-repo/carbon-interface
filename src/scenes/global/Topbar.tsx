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
    <Box display='flex' justifyContent='flex-end' p={2} backgroundColor={colors.primary[400]}>
      <Box display='flex' mr={'3rem'} mt={'1rem'} mb={'1rem'} gap={'40px'}>
        <a href='https://mattburnett-repo.github.io/portfolio-website/'>
          <img
            alt='ladder icon'
            width='35px'
            height='35px'
            src={ladderIcon}
            style={{ cursor: 'pointer', borderRadius: '50%' }}
          />
        </a>
        <IconButton onClick={colorMode.toggleColorMode} sx={{ transform: 'scale(1.5)' }}>
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