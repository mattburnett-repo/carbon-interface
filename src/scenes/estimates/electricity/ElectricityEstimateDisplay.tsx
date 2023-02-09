import React from 'react'

import { Box, Grid, Typography, useTheme } from '@mui/material'

//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import { tokens } from '../../../theme'

import { type iDisplayProps } from './types'

const ElectricityEstimateDisplay = (data: iDisplayProps): JSX.Element => {
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
