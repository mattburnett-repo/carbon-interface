import React from 'react'
import { useQuery } from 'react-query'

import { Box, Grid, Typography } from '@mui/material'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'

interface iProps {
  type: string
  electricity_unit: string
  electricity_value: number
  country: string
  state?: string
}

const baseURL: string = import.meta.env.VITE_API_BASE_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const ElectricityEstimate: React.FC<iProps> = (
  requestData: iProps
): JSX.Element => {
  const { isLoading, error, data } = useQuery(
    // We have to reference the response data as data.data.someValue because the API returns { "data": {the api response}}
    //    and useQuery returns the API response as 'data' var, ie {data: {"data": {the api response}}}
    // TLDR: the duplicate data.data.someData is unavoidable because the api response and useQuery both use 'data' as a key

    // Query key ensures that query re-runs when requestData changes:
    // https://tkdodo.eu/blog/effective-react-query-keys
    // https://react-query-v3.tanstack.com/guides/query-keys#array-keys
    // https://react-query-v3.tanstack.com/guides/query-keys#if-your-query-function-depends-on-a-variable-include-it-in-your-query-key
    ['electricityEstimate', requestData],
    async () =>
      await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({ ...requestData })
      }).then(async (res) => await res.json())
  )

  if (isLoading) return <LoadingDisplay />
  if (error !== null) return <ErrorDisplay message={error} />

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
        {requestData.type} Estimate
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

export default ElectricityEstimate
