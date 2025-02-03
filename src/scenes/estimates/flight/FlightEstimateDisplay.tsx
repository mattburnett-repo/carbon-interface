import React from 'react'

import { Box, Grid, Typography, useTheme } from '@mui/material'

import { tokens } from '../../../theme'

import { type iDisplayProps, type iLeg } from './types'

const FlightEstimateDisplay = ({ data }: iDisplayProps): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!data ? (
        <img src="/airplane.jpg" alt="Flight estimate" style={{ width: '400px' }} />
      ) : (
        <Box className='estimate' sx={{ mt: '5rem', backgroundColor: colors.primary[400] }}>
          <Typography
            variant={'h1'}
            sx={{
              textAlign: 'center',
              marginTop: '0.75 rem',
              textTransform: 'capitalize'
            }}
          >
            Flight Estimate
          </Typography>

          <Grid
            container
            alignContent={'space-between'}
            justifyContent={'center'}
            columnGap={'5rem'}
          >
            <Grid item>
              <Typography padding='0.5rem'>
                Distance Unit: {data.attributes.distance_unit}
              </Typography>
            </Grid>

            <Grid item>
              <Typography padding='0.5rem'>
                Passengers: {data.attributes.passengers}
              </Typography>
            </Grid>
            <Grid item>
              <Typography padding='0.5rem'>
                Estimated at:
                {/* https://stackoverflow.com/questions/44493088/format-a-date-string-in-javascript */}
                {data.attributes.estimated_at.replace(
                  /(\d{4})-(\d{2})-(\d{2}).*/,
                  '$3-$2-$1'
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography padding='0.5rem'>ID: {data.id}</Typography>
            </Grid>
            <Grid item>
              <Grid container gridTemplateColumns={'2'}>
                <Grid item paddingRight={'5px'}>
                  <Typography padding='0.5rem'>Legs:</Typography>
                </Grid>
                <Grid item>
                  {data.attributes.legs.map((leg: iLeg, i: number) => {
                    return (
                      <Typography
                        padding='0.5rem'
                        key={`${leg.departure_airport}-${leg.destination_airport}-${i}`}
                      >
                        {leg.departure_airport} to {leg.destination_airport}
                      </Typography>
                    )
                  })}
                </Grid>
              </Grid>
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
                  data.attributes.carbon_g
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography padding='0.5rem'>
                Carbon (lbs):{' '}
                {new Intl.NumberFormat('en-US', {}).format(
                  data.attributes.carbon_lb
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography padding='0.5rem'>
                Carbon (kg):{' '}
                {new Intl.NumberFormat('en-US', {}).format(
                  data.attributes.carbon_kg
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography padding='0.5rem'>
                Carbon (mt):{' '}
                {new Intl.NumberFormat('en-US', {}).format(
                  data.attributes.carbon_mt
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default FlightEstimateDisplay
