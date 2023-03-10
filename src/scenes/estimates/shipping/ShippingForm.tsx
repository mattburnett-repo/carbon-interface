/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import { useFormik } from 'formik'
import * as yup from 'yup'

// @ts-expect-error type this
import DistanceUnits from '../../../components/distance/DistanceUnits'

import { type iInitialValues } from './types'

const initialValues: iInitialValues = {
  type: 'shipping',
  weight_unit: 'g',
  weight_value: 1,
  distance_unit: 'km',
  distance_value: 1,
  transport_method: 'truck'
}
const validationSchema = yup.object().shape({
  weight_value: yup
    .number()
    .min(1, 'Weight value must be greater than 0.')
    .required('Weight value is required. Numbers only.'),
  distance_value: yup
    .number()
    .min(1, 'Distance value must be greater than 0.')
    .required('Distance value is required. Numbers only.')
})

const ShippingForm = (): JSX.Element => {
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
            <InputLabel id='weight_unit-label'>Weight Unit</InputLabel>
            <Select
              id='weight_unit'
              labelId='weight_unit-label'
              {...formik.getFieldProps('weight_unit')}
            >
              <MenuItem value={'g'}>Grams</MenuItem>
              <MenuItem value={'kg'}>Kilograms</MenuItem>
              <MenuItem value={'lb'}>Pounds</MenuItem>
              <MenuItem value={'mt'}>Tonnes</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id='weight_value-label'>Weight Value</InputLabel>
            <TextField
              id='weight_value'
              {...formik.getFieldProps('weight_value')}
            />
            {formik.touched.weight_value !== undefined &&
            formik.errors.weight_value !== undefined ? (
              <div>{formik.errors.weight_value}</div>
            ) : null}
          </Grid>
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
            <InputLabel id='transport_method-label'>
              Transport Method
            </InputLabel>
            <Select
              id='transport_method'
              labelId='transport_method-label'
              {...formik.getFieldProps('transport_method')}
            >
              <MenuItem value={'ship'}>Ship</MenuItem>
              <MenuItem value={'train'}>Train</MenuItem>
              <MenuItem value={'truck'}>Truck</MenuItem>
              <MenuItem value={'plane'}>Plane</MenuItem>
            </Select>
          </Grid>
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

export default ShippingForm

/* eslint-enable @typescript-eslint/strict-boolean-expressions */
