import React from 'react'

import { Box, Grid, Typography, useTheme } from '@mui/material'

import { tokens } from '../../../theme'

import { type iDisplayProps } from './types'

const ElectricityEstimateDisplay = ({ data }: iDisplayProps) => {
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
        <img src="/lightbulb.jpg" alt="Electricity estimate" style={{ width: '400px' }} />
      ) : (
        <Box className='estimate' sx={{ mt: '2rem', backgroundColor: colors.primary[400] }}>
          <Typography
            variant={'h1'}
            sx={{
              textAlign: 'center',
              mb: 2,
              textTransform: 'capitalize',
              fontSize: '2rem'
            }}
          >
            Electricity Estimate
          </Typography>

          <Grid
            container
            alignContent={'space-between'}
            justifyContent={'center'}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Unit: {data.attributes.electricity_unit}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Value: {data.attributes.electricity_value}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Country: {data.attributes.country.toUpperCase()}
              </Typography>
            </Grid>
            {data.attributes.state !== '' && (
              <Grid item xs={12} md={6}>
                <Typography padding='0.5rem'>
                  State/Region: {data.attributes.state.toUpperCase()}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Estimated at:
                {/* https://stackoverflow.com/questions/44493088/format-a-date-string-in-javascript */}
                {data.attributes.estimated_at.replace(
                  /(\d{4})-(\d{2})-(\d{2}).*/,
                  '$3-$2-$1'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>ID: {data.id}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignContent={'space-between'}
            justifyContent={'center'}
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Carbon (grams):{' '}
                {new Intl.NumberFormat('en-US', {}).format(
                  data.attributes.carbon_g
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Carbon (lbs):{' '}
                {new Intl.NumberFormat('en-US', {}).format(
                  data.attributes.carbon_lb
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography padding='0.5rem'>
                Carbon (kg):{' '}
                {new Intl.NumberFormat('en-US', {}).format(
                  data.attributes.carbon_kg
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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

export default ElectricityEstimateDisplay
