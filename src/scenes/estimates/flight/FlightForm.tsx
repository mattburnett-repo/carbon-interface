import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  Typography,
  Button,
  InputLabel,
  TextField,
  useTheme
} from '@mui/material'

import { tokens } from '../../../theme'

import { useFormik } from 'formik'
import * as yup from 'yup'
import DistanceUnits from '../../../components/distance/DistanceUnits'
import FlightLeg from '../../../components/flight/FlightLeg'
import { type iFlightFormFields } from './types'

const initialValues: iFlightFormFields = {
  type: 'flight',
  passengers: 1,
  legs: [],
  distance_unit: 'km',
  cabin_class: 'economy'
}

const validationSchema = yup.object().shape({
  legs: yup.array().of(
    yup.object().shape({
      departure_airport: yup.string().required('At least one flight leg is required.'),
      destination_airport: yup.string().required('At least one flight leg is required.')
    })
  ).min(1, 'At least one flight leg is required.'),
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
    onSubmit: (values: iFlightFormFields): void => {
      navigate(`/estimates/${values.type}`, { state: { values } })
    }
  })

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
      <form role="form" onSubmit={formik.handleSubmit}>
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
            <DistanceUnits 
              value={formik.values.distance_unit}
              onChange={(e) => formik.setFieldValue('distance_unit', e.target.value)}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item>
            <TextField
              id="passengers"
              label="Passengers"
              inputProps={{ "aria-label": "passengers" }}
              {...formik.getFieldProps('passengers')}
            />
            {formik.touched.passengers !== undefined &&
            formik.errors.passengers !== undefined ? (
              <div role="alert">{formik.errors.passengers}</div>
            ) : null}
          </Grid>

          <FlightLeg 
            legs={formik.values.legs} 
            onLegsChange={(newLegs) => formik.setFieldValue('legs', newLegs)} 
            onUnsavedChanges={(hasChanges) => formik.setFieldError(
              'legs', 
              hasChanges ? 'Click the + button to add this leg before getting estimate' : undefined
            )}
          />
          {formik.touched.legs !== undefined &&
          formik.errors.legs !== undefined ? (
            <Grid item xs={12}>
              <Typography role="alert" color="error" sx={{ textAlign: 'center', mt: 2 }}>
                {formik.values.legs.length === 0 && 
                 (!formik.isSubmitting || !formik.dirty)
                  ? 'Select departure airport, destination airport, and cabin class, then click the + button'
                  : 'Click the + button to add a flight leg'}
              </Typography>
            </Grid>
          ) : null}
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
