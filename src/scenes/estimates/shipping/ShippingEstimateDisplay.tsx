import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

interface iProps {
  data: {
    id: string
    type: string
    attributes: {
      weight_unit: 'g' | 'kg' | 'lb' | 'mt'
      weight_value: number
      distance_unit: 'mi' | 'km'
      distance_value: number
      transport_method: 'ship' | 'train' | 'truck' | 'plane'
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}

const ShippingEstimateDisplay = (data: iProps): JSX.Element => {
  // We have to reference the prop data as data.data.someValue because the API returns { "data": {the api response}}
  //    and useQuery returns the API response as 'data' var, ie {data: {"data": {the api response}}}
  // TLDR: the duplicate data.data.someData is unavoidable because the api response and useQuery both use 'data' as a key

  return (
    <Box className='estimate'>
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
        columnGap={'1rem'}
      >
        <Grid item>
          <Typography padding='0.5rem'>
            Weight Unit: {data.data.attributes.weight_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Weight Value:
            {new Intl.NumberFormat('en-US', {}).format(
              data.data.attributes.weight_value
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Distance Unit: {data.data.attributes.distance_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Distance Value:{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              data.data.attributes.distance_value
            )}
          </Typography>
        </Grid>

        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Transport Method: {data.data.attributes.transport_method}
          </Typography>
        </Grid>
        <Grid item>
          {/*  FIXME: better date/time formatting */}
          <Typography padding='0.5rem'>
            Estimated at:
            {/* https://stackoverflow.com/questions/44493088/format-a-date-string-in-javascript */}
            {data.data.attributes.estimated_at.replace(
              /(\d{4})-(\d{2})-(\d{2}).*/,
              '$3-$2-$1'
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>ID: {data.data.id}</Typography>
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
            {new Intl.NumberFormat('en-US', {}).format(
              data.data.attributes.carbon_g
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (lbs):{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              data.data.attributes.carbon_lb
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (kg):{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              data.data.attributes.carbon_kg
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (mt):{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              data.data.attributes.carbon_mt
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ShippingEstimateDisplay
