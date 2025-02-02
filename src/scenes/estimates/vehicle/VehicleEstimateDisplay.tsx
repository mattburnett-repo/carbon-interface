import React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import { type VehicleEstimate } from './types'

interface Props {
  estimate: VehicleEstimate
}

const VehicleEstimateDisplay = ({ estimate }: Props): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box className='estimate' sx={{ mt: '5rem', backgroundColor: colors.primary[400] }}>
      <Typography variant={'h1'} sx={{ textAlign: 'center', marginTop: '0.75 rem', textTransform: 'capitalize' }}>
        Vehicle Estimate
      </Typography>
      <Grid
        container
        alignContent={'space-between'}
        justifyContent={'center'}
        columnGap={'1rem'}
      >
        <Grid item>
          <Typography padding='0.5rem'>
            Distance Unit: {estimate.data.attributes.distance_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Distance Value:{' '}
            {new Intl.NumberFormat('en-US', {}).format(estimate.data.attributes.distance_value)}
          </Typography>
        </Grid>

        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Vehicle Make: {estimate.data.attributes.vehicle_make}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Vehicle Year: {estimate.data.attributes.vehicle_year}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Vehicle Model: {estimate.data.attributes.vehicle_model}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Estimated at:{' '}
            {estimate.data.attributes.estimated_at.replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3-$2-$1')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>ID: {estimate.data.id}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignContent={'space-between'}
        justifyContent={'center'}
        columnGap={'5rem'}
      >
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (grams):{' '}
            {new Intl.NumberFormat('en-US', {}).format(estimate.data.attributes.carbon_g)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (lbs):{' '}
            {new Intl.NumberFormat('en-US', {}).format(estimate.data.attributes.carbon_lb)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (kg):{' '}
            {new Intl.NumberFormat('en-US', {}).format(estimate.data.attributes.carbon_kg)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (mt):{' '}
            {new Intl.NumberFormat('en-US', {}).format(estimate.data.attributes.carbon_mt)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default VehicleEstimateDisplay
