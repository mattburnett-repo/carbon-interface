/* eslint-disable object-curly-spacing */
/* eslint-disable react/prop-types */

import React, {useState} from 'react'

import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar'
import {Box, IconButton, Typography, useTheme} from '@mui/material'
import {Link} from 'react-router-dom'

import 'react-pro-sidebar/dist/css/styles.css'

import {tokens} from '../../theme'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import TungstenOutlinedIcon from '@mui/icons-material/TungstenOutlined'
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined'

import ladderIcon from '../../assets/ladderIcon_01.png'

const Item = ({title, to, icon, selected, setSelected}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
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
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100]
            }}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography
                  variant='h3'
                  color={colors.grey[100]}
                  marginRight={'10px'}
                >
                  Carbon Interface
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <a href='https://mattburnett-repo.github.io/portfolio-website/'>
                  <img
                    alt='ladder icon'
                    width='100px'
                    height='100px'
                    src={ladderIcon}
                    style={{
                      cursor: 'default',
                      borderRadius: '50%'
                    }}
                  />
                </a>
              </Box>

              {/* <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]} sx={{ m: '30px 0 0 0' }}>
                  Carbon Interface API Frontend
                </Typography>
              </Box> */}
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h6'
              color={colors.grey[300]}
              sx={{m: '15px 5px 9px 15px'}}
            >
              Estimates
            </Typography>
            <Item
              title='Electricity'
              to='/estimates/electricity'
              icon={<TungstenOutlinedIcon sx={{rotate: '180deg'}} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Flight'
              to='/estimates/flight'
              icon={<FlightOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Shipping'
              to='/estimates/shipping'
              icon={<LocalShippingOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Vehicle'
              to='/estimates/vehicle'
              icon={<DirectionsCarFilledOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Fuel Combustion'
              to='/estimates/fuel_combustion'
              icon={<LocalGasStationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Show Estimates'
              to='/estimates/estimate'
              icon={<FindInPageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
          <Box
            marginTop={5}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Item
              title='&copy; 2023 Matt Burnett'
              to='https://mattburnett-repo.github.io/portfolio-website/'
              // image='../../assets/ladderIcon_01.png'
              // selected={selected}
              // setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar

/* eslint-enable react/prop-types */
