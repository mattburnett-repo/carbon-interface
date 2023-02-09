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
      country: string
      state: string
      electricity_unit: 'kwh' | 'mwh'
      electricity_value: number
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}

const ElectricityEstimateDisplay = (data: iProps): JSX.Element => {
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
        Electricity Estimate
      </Typography>

      <Grid
        container
        alignContent={'space-between'}
        justifyContent={'center'}
        columnGap={'5rem'}
      >
        <Grid item>
          <Typography padding='0.5rem'>
            Unit: {data.data.attributes.electricity_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Value: {data.data.attributes.electricity_value}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Country: {data.data.attributes.country.toUpperCase()}
          </Typography>
        </Grid>
        {data.data.attributes.state !== '' ? (
          <Grid item>
            <Typography padding='0.5rem'>
              State/Region: {data.data.attributes.state.toUpperCase()}
            </Typography>
          </Grid>
        ) : null}
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

export default ElectricityEstimateDisplay
