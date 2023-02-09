import React from 'react'

import { Box, Grid, Typography, useTheme } from '@mui/material'
//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import { tokens } from '../../../theme'

interface iProps {
  data: {
    id: string
    type: string
    attributes: {
      vehicle_make: string
      vehicle_model: string
      vehicle_year: number
      vehicle_model_id: string
      distance_unit: string
      distance_value: number
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}

const VehicleEstimateDisplay = (data: iProps): JSX.Element => {
  // We have to reference the prop data as data.data.someValue because the API returns { "data": {the api response}}
  //    and useQuery returns the API response as 'data' var, ie {data: {"data": {the api response}}}
  // TLDR: the duplicate data.data.someData is unavoidable because the api response and useQuery both use 'data' as a key

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
            Vehicle Make: {data.data.attributes.vehicle_make}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Vehicle Model: {data.data.attributes.vehicle_model}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem' textTransform={'capitalize'}>
            Vehicle Year: {data.data.attributes.vehicle_year}
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

export default VehicleEstimateDisplay
