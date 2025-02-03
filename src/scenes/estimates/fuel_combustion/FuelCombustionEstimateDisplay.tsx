import React from 'react'

import { Box, Grid, Typography, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import {
  useFuelSourceName
} from '../../../components/fuel_combustion/FuelSources'
import { type FuelCombustionEstimate } from './types'

interface Props {
  estimate: FuelCombustionEstimate | null
}

const FuelCombustionEstimateDisplay = ({ estimate }: Props): JSX.Element => {
  // We have to reference the prop data as data.data.someValue because the API returns { "data": {the api response}}
  //    and useQuery returns the API response as 'data' var, ie {data: {"data": {the api response}}}
  // TLDR: the duplicate data.data.someData is unavoidable because the api response and useQuery both use 'data' as a key

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  if (!estimate) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary[400],
          transition: 'background-color 0.3s ease-in-out'
        }}
      >
        <img src="/gas-pump.jpg" alt="Fuel combustion estimate" style={{ width: '400px' }} />
      </Box>
    )
  }

  const fuelSourceName = useFuelSourceName(
    estimate.attributes.fuel_source_type
  )

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
        Fuel Combustion Estimate
      </Typography>
      <Grid
        container
        alignContent={'space-between'}
        justifyContent={'center'}
        columnGap={'5rem'}
      >
        <Grid item>
          <Typography padding='0.5rem'>
            Fuel Source Type: {fuelSourceName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Fuel Source Unit: {estimate.attributes.fuel_source_unit}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Fuel Source Value:{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              estimate.attributes.fuel_source_value
            )}
          </Typography>
        </Grid>

        <Grid item>
          <Typography padding='0.5rem'>
            Estimated at:
            {/* https://stackoverflow.com/questions/44493088/format-a-date-string-in-javascript */}
            {estimate.attributes.estimated_at.replace(
              /(\d{4})-(\d{2})-(\d{2}).*/,
              '$3-$2-$1'
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>ID: {estimate.id}</Typography>
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
              estimate.attributes.carbon_g
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (lbs):{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              estimate.attributes.carbon_lb
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (kg):{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              estimate.attributes.carbon_kg
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography padding='0.5rem'>
            Carbon (mt):{' '}
            {new Intl.NumberFormat('en-US', {}).format(
              estimate.attributes.carbon_mt
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FuelCombustionEstimateDisplay
