import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  InputLabel
} from '@mui/material'

import { useFormik } from 'formik'
import * as yup from 'yup'

// @ts-expect-error type this
import VehicleMakes from '../../../components/vehicle/VehicleMakes.jsx'
// @ts-expect-error type this
import VehicleModels from '../../../components/vehicle/VehicleModels.jsx'
// @ts-expect-error type this
import DistanceUnits from '../../../components/distance/DistanceUnits'

import { type iInitialValues } from './types'

const initialValues: iInitialValues = {
  type: 'vehicle',
  distance_unit: 'km',
  distance_value: 0,
  vehicle_make_id: '',
  vehicle_model_id: ''
}
const validationSchema = yup.object().shape({
  vehicle_make_id: yup.string().required('Vehicle make is required.'),
  vehicle_model_id: yup.string().required('Vehicle model is required.'),
  distance_value: yup
    .number()
    .min(1, 'Distance value must be greater than 0.')
    .required('Distance value is required. Numbers only.')
})

const VehicleForm = (): JSX.Element => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: object): void => {
      navigate(`/estimates/${initialValues.type}`, { state: { values } })
    }
  })

  return (
    <Box className='estimate'>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant='h1'
          sx={{ textAlign: 'center', mb: '2rem', textTransform: 'capitalize' }}
        >
          {formik.values.type}
        </Typography>
        <Grid
          container
          alignContent={'space-around'}
          justifyContent={'center'}
          columnGap={'5rem'}
          gridTemplateColumns={'5'}
        >
          <Grid item>
            <DistanceUnits parentState={formik} />
          </Grid>
          <Grid item>
            <InputLabel id='distance_value-label'>Distance Value</InputLabel>
            <TextField
              id='distance_value'
              {...formik.getFieldProps('distance_value')}
            />
            {formik.touched.distance_value !== undefined &&
            formik.errors.distance_value !== undefined ? (
              <div>{formik.errors.distance_value}</div>
            ) : null}
          </Grid>
          <Grid item>
            <InputLabel id='vehicle_make_id-label'>Vehicle Make</InputLabel>
            <VehicleMakes parentState={formik} />
            {formik.touched.vehicle_make_id !== undefined ||
            formik.errors.vehicle_make_id !== undefined ? (
              <div>{formik.errors.vehicle_make_id}</div>
            ) : null}
          </Grid>
          {formik.values.vehicle_make_id !== '' &&
          formik.values.vehicle_make_id !== undefined ? (
            <Grid item>
              <InputLabel id='vehicle_model_id-label'>Vehicle Model</InputLabel>
              <VehicleModels
                parentState={formik}
                makeId={formik.values.vehicle_make_id}
              />
              {formik.touched.vehicle_model_id !== undefined &&
              formik.errors.vehicle_model_id !== undefined ? (
                <div>{formik.errors.vehicle_model_id}</div>
              ) : null}
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

export default VehicleForm
