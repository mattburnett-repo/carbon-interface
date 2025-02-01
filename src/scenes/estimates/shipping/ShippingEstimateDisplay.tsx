import React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { tokens } from '../../../theme'

interface ShippingEstimateDisplayProps {
  values: {
    weight_unit: string
    weight_value: number
    distance_unit: string
    distance_value: number
    transport_method: string
    estimated_at?: string
    id?: string
    carbon_g?: number
    carbon_lb?: number
    carbon_kg?: number
    carbon_mt?: number
  }
}

const ShippingEstimateDisplay: React.FC<ShippingEstimateDisplayProps> = ({ values }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box
      className='estimate'
      sx={{ mt: '5rem', backgroundColor: colors.primary[400] }}
    >
      <Typography
        variant={'h1'}
        sx={{
          textAlign: 'center',
          marginTop: '0.75 rem',
          textTransform: 'capitalize'
        }}
      >
        Shipping Estimate
      </Typography>
      <Grid
        container
        alignContent={'space-between'}
        justifyContent={'center'}
        columnGap={'5rem'}
      >
        <Grid item>
          <Typography padding='0.5rem'>
            Weight Unit: {values.weight_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Weight Value:
            {new Intl.NumberFormat('en-US', {}).format(values.weight_value)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Distance Unit: {values.distance_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Distance Value:{' '}
            {new Intl.NumberFormat('en-US', {}).format(values.distance_value)}
          </Typography>
        </Grid>

        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Transport Method: {values.transport_method}
          </Typography>
        </Grid>
        {values.estimated_at && (
          <Grid item>
            <Typography padding='0.5rem'>
              Estimated at:
              {values.estimated_at.replace(
                /(\d{4})-(\d{2})-(\d{2}).*/,
                '$3-$2-$1'
              )}
            </Typography>
          </Grid>
        )}
        {values.id && (
          <Grid item>
            <Typography padding='0.5rem'>ID: {values.id}</Typography>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        alignContent={'space-between'}
        justifyContent={'center'}
        columnGap={'5rem'}
      >
        {values.carbon_g !== undefined && (
          <Grid item>
            <Typography padding='0.5rem'>
              Carbon (grams):{' '}
              {new Intl.NumberFormat('en-US', {}).format(values.carbon_g)}
            </Typography>
          </Grid>
        )}
        {values.carbon_lb !== undefined && (
          <Grid item>
            <Typography padding='0.5rem'>
              Carbon (lbs):{' '}
              {new Intl.NumberFormat('en-US', {}).format(values.carbon_lb)}
            </Typography>
          </Grid>
        )}
        {values.carbon_kg !== undefined && (
          <Grid item>
            <Typography padding='0.5rem'>
              Carbon (kg):{' '}
              {new Intl.NumberFormat('en-US', {}).format(values.carbon_kg)}
            </Typography>
          </Grid>
        )}
        {values.carbon_mt !== undefined && (
          <Grid item>
            <Typography padding='0.5rem'>
              Carbon (mt):{' '}
              {new Intl.NumberFormat('en-US', {}).format(values.carbon_mt)}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default ShippingEstimateDisplay
