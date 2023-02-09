// FIXME: resolve the issue with no-floating-promises
/* eslint-disable @typescript-eslint/no-floating-promises */

import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme
} from '@mui/material'

//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import { tokens } from '../../../theme'

import { useFormik } from 'formik'
import * as yup from 'yup'

import FlightLeg from './FlightLeg'

interface Leg {
  departure_airport: string
  destination_airport: string
  cabin_class: string
}

interface FlightFormFields {
  type: string
  passengers: number
  legs: Leg[]
  distance_unit: string
}

const initialValues: FlightFormFields = {
  type: 'flight',
  passengers: 1,
  legs: [],
  distance_unit: 'km'
}

const validationSchema = yup.object().shape({
  legs: yup.array().min(1, 'At least one flight leg is required.'),
  passengers: yup
    .number()
    .min(1, 'Passenger Count must be greater than 0.')
    .max(300, 'Passenger Count must be 300 or less.')
    .required('Passenger Count is required. Numbers only.')
})

const FlightForm = (): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: object): void => {
      navigate(`/estimates/${initialValues.type}`, { state: { values } })
    }
  })

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant='h1'
          sx={{
            textAlign: 'center',
            mb: '2rem',
            textTransform: 'capitalize'
          }}
        >
          {formik.values.type}
        </Typography>
        <Grid
          container
          alignContent={'space-around'}
          justifyContent={'center'}
          columnGap={'12.5rem'}
        >
          <Grid item>
            <InputLabel id='distance_unit-label'>Distance Unit</InputLabel>
            <Select
              id='distance_unit'
              labelId='distance_unit-label'
              {...formik.getFieldProps('distance_unit')}
            >
              <MenuItem value={'km'}>Kilometers</MenuItem>
              <MenuItem value={'mi'}>Miles</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id='passengers-label'>Passengers</InputLabel>
            <TextField
              id='passengers'
              {...formik.getFieldProps('passengers')}
            />
            {formik.touched.passengers !== undefined &&
            formik.errors.passengers !== undefined ? (
              <div>{formik.errors.passengers}</div>
            ) : null}
          </Grid>

          {/* Component to select filight legs */}
          <FlightLeg parentState={formik.values.legs} />
        </Grid>
        <Box display='flex' justifyContent='center' mt='2rem' p='1rem'>
          <Button type='submit' color='secondary' variant='contained'>
            Get Estimate
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default FlightForm

/* eslint-enable @typescript-eslint/no-floating-promises */
