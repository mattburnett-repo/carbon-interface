import React from 'react'

import { Box, Typography, Grid, useTheme } from '@mui/material'

//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import { tokens } from '../../theme'
import DashboardCard from '../../components/DashboardCard'

const Dashboard: React.FC = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // for grid / grid item layout. makes three columns
  const xlVal = 4
  const gridItemPadding = '25px'

  return (
    <Box
      className='estimate'
      sx={{
        p: '15px',
        m: 'auto',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary[400]
      }}
    >
      <Typography variant='h1' sx={{ textAlign: 'center', mb: '2rem' }}>
        Carbon Interface API Frontend
      </Typography>
      <Grid container justifyContent={'center'}>
        <Grid
          item
          xl={xlVal}
          display='flex'
          justifyContent='center'
          padding={gridItemPadding}
        >
          <DashboardCard
            title='Electricity'
            image='lightbulb.jpg'
            endpoint='electricity'
          />
        </Grid>
        <Grid
          item
          xl={xlVal}
          display='flex'
          justifyContent='center'
          padding={gridItemPadding}
        >
          <DashboardCard
            title='Flight'
            image='airplane.jpg'
            endpoint='flight'
          />
        </Grid>
        <Grid
          item
          xl={xlVal}
          display='flex'
          justifyContent='center'
          padding={gridItemPadding}
        >
          <DashboardCard
            title='Shipping'
            image='shipping-truck.jpg'
            endpoint='shipping'
          />
        </Grid>
        <Grid
          item
          xl={xlVal}
          display='flex'
          justifyContent='center'
          padding={gridItemPadding}
        >
          <DashboardCard title='Vehicle' image='car.jpg' endpoint='vehicle' />
        </Grid>
        <Grid
          item
          xl={xlVal}
          display='flex'
          justifyContent='center'
          padding={gridItemPadding}
        >
          <DashboardCard
            title='Fuel Combustion'
            image='gas-pump.jpg'
            endpoint='fuel_combustion'
          />
        </Grid>
        <Grid
          item
          xl={xlVal}
          display='flex'
          justifyContent='center'
          padding={gridItemPadding}
        >
          <DashboardCard
            title='Show Estimates'
            image='search-all.jpg'
            endpoint='estimate'
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
