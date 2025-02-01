import React, { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, Typography, useTheme, Tooltip, Divider, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import TungstenOutlinedIcon from '@mui/icons-material/TungstenOutlined'
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined'

interface ItemProps {
  title: string
  to: string
  icon?: JSX.Element
  selected: string
  setSelected: (title: string) => void
  isCollapsed: boolean
}

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }: ItemProps): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Tooltip 
      title={title} 
      placement="right"
      arrow
      disableHoverListener={!isCollapsed}
    >
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
        role="menuitem"
        aria-label={title}
        tabIndex={0}
      >
        <Typography>{title}</Typography>
        <Link 
          to={to}
          aria-label={`Navigate to ${title}`}
          role="link"
        />
      </MenuItem>
    </Tooltip>
  )
}

const Sidebar = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setIsCollapsed(isMediumScreen)
  }, [isMediumScreen])

  return (
    <Box
      role="navigation"
      aria-label="Main Navigation"
      data-testid="sidebar-nav"
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
          transition: 'background-color 0.3s ease-in-out'
        },
        '& .pro-menu-item:hover': {
          backgroundColor: 'transparent !important',
          transition: 'background-color 0.3s ease-in-out'
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-inner-item': {
          padding: '5px 20px 5px 20px !important',
          color: colors.grey[100],
          transition: 'all 0.3s ease-in-out',
          borderRadius: '4px',
          margin: '0',
          width: '100%'
        },
        '& .pro-inner-item:hover': {
          color: `${colors.redAccent[200]} !important`,
          backgroundColor: `${colors.primary[400]}40 !important`,
          transition: 'all 0.3s ease-in-out'
        },
        '& .pro-menu-item.active': {
          color: `${colors.redAccent[200]} !important`,
          backgroundColor: `${colors.primary[400]}40 !important`,
          borderLeft: `4px solid ${colors.redAccent[200]}`
        },
        '& .pro-inner-item:focus-visible': {
          outline: `2px solid ${colors.grey[100]}`,
          outlineOffset: '2px'
        },
        '& .pro-menu-item': {
          textAlign: 'left'
        },
        '& .pro-item-content': {
          justifyContent: 'flex-start'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? (
              <MenuOutlinedIcon 
                data-testid="MenuOutlinedIcon" 
                sx={{ color: colors.grey[100] }}
              />
            ) : undefined}
          >
            {!isCollapsed && (
              <Box>
                <Typography 
                  variant='h5'
                  sx={{ color: colors.grey[100] }}
                >
                  Carbon Interface
                </Typography>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            {!isCollapsed ? (
              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 0' }}
              >
                Estimates
              </Typography>
            ) : (
              <Divider sx={{ 
                m: '15px 0',
                borderColor: colors.grey[300],
                opacity: 0.4
              }} />
            )}

            <Item
              title='Electricity'
              to='/estimates/electricity'
              icon={<TungstenOutlinedIcon sx={{ rotate: '180deg' }} />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title='Flight'
              to='/estimates/flight'
              icon={<FlightOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title='Shipping'
              to='/estimates/shipping'
              icon={<LocalShippingOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title='Vehicle'
              to='/estimates/vehicle'
              icon={<DirectionsCarFilledOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title='Fuel Combustion'
              to='/estimates/fuel_combustion'
              icon={<LocalGasStationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title='Show Estimates'
              to='/estimates/estimate'
              icon={<FindInPageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar