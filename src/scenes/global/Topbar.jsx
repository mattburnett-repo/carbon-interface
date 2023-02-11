import React, { useContext } from 'react'

import { Box, IconButton, useTheme } from '@mui/material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

import { ColorModeContext, tokens } from '../../theme'

const Topbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  return (
    <Box display="flex" justifyContent="flex-end" p={2} backgroundColor={colors.primary[400]}>
      <Box display="flex" mr={'3rem'} mt={'1rem'} mb={'1rem'}>
        <IconButton onClick={colorMode.toggleColorMode} sx={{ transform: 'scale(1.5)' }}>
          {theme.palette.mode === 'dark'
            ? (
              <LightModeOutlinedIcon />
              )
            : (
              <DarkModeOutlinedIcon />
              )}
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar
