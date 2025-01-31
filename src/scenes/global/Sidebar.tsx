import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme, Tooltip, Divider } from '@mui/material'
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
import ladderIcon from '../../assets/ladderIcon_01.png'

interface ItemProps {
  title: string
  to: string
  icon?: React.ReactElement
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
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    </Tooltip>
  )
}

const Sidebar = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important'
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important'
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon data-testid="MenuOutlinedIcon" /> : undefined}
          >
          {!isCollapsed && (
            <Box 
              display='flex' 
              alignItems='center'
            >
              <Typography variant='h5'>Carbon Interface</Typography>
            </Box>
          )}
        </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : '0'}>
            <Item
              title='Dashboard'
              to='/'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            {isCollapsed ? (
              <Divider sx={{ 
                m: '15px 0',
                borderColor: colors.grey[300],
                opacity: 0.4
              }} />
            ) : (
              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: '15px 5px 9px 20px' }}
              >
                Estimates
              </Typography>
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