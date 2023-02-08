import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

interface Leg {
  departure_airport: string
  destination_airport: string
  cabin_class?: string
}

interface iProps {
  data: {
    id: string
    type: string
    attributes: {
      passengers: number
      legs: Leg[]
      distance_value: number
      distance_unit: string
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}

// TODO: validation here and in FlightLeg needs to be improved. Not really using Formik completely well.

const FlightEstimateDisplay = (data: iProps): JSX.Element => {
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
        Flight Estimate
      </Typography>

      <Grid container justifyContent={'center'} columnGap={'5rem'}>
        <Grid item>
          <Typography>
            Distance Unit: {data.data.attributes.distance_unit}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>Passengers: {data.data.attributes.passengers}</Typography>
        </Grid>
        <Grid item>
          {/*  FIXME: better date/time formatting */}
          <Typography>
            Estimated at:
            {/* https://stackoverflow.com/questions/44493088/format-a-date-string-in-javascript */}
            {data.data.attributes.estimated_at.replace(
              /(\d{4})-(\d{2})-(\d{2}).*/,
              '$3-$2-$1'
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>ID: {data.data.id}</Typography>
        </Grid>
        <Grid item>
          <Grid container gridTemplateColumns={'2'}>
            <Grid item paddingRight={'5px'}>
              <Typography>Legs:</Typography>
            </Grid>
            <Grid item>
              {data.data.attributes.legs.map((leg: Leg, i: number) => {
                return (
                  <Typography
                    key={`${leg.departure_airport}-${leg.destination_airport}-${i}`}
                  >
                    {leg.departure_airport} to {leg.destination_airport}
                    {/* FIXME: {leg?.cabin_class !== undefined ? leg.cabin_class : null} */}
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

export default FlightEstimateDisplay
