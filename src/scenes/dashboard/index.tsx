import React from 'react'

import { Box, Typography } from '@mui/material'

import DashboardCard from '../../components/DashboardCard'

const Dashboard: React.FC = (): JSX.Element => {
  return (
    <Box sx={{ ml: '150px', p: '30px' }}>
      <Typography variant='h1'>Carbon Estimate API Frontend</Typography>
      <Box
        display='grid'
        gridTemplateColumns='repeat(3, 1fr)'
        alignContent='center'
        justifyContent='center'
      >
        <DashboardCard
          title='Electricity'
          image='lightbulb.jpg'
          endpoint='electricity'
        />
        <DashboardCard title='Flight' image='airplane.jpg' endpoint='flight' />
        <DashboardCard
          title='Shipping'
          image='shipping-truck.jpg'
          endpoint='shipping'
        />
        <DashboardCard title='Vehicle' image='car.jpg' endpoint='vehicle' />
        <DashboardCard
          title='Fuel Combustion'
          image='gas-pump.jpg'
          endpoint='fuel_combustion'
        />
        <DashboardCard
          title='Show Estimates'
          image='search-all.jpg'
          endpoint='estimate'
        />
      </Box>
    </Box>
  )
}

export default Dashboard
