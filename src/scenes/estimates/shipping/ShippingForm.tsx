/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  useTheme
} from '@mui/material'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { tokens } from '../../../theme'
import { type iInitialValues } from './types'
import DistanceUnits from '../../../components/distance/DistanceUnits'

interface ShippingFormProps {
  onSubmit: (values: iInitialValues) => void;
}

const initialValues: iInitialValues = {
  type: 'shipping',
  weight_unit: 'kg',
  weight_value: 100,
  distance_unit: 'km',
  distance_value: 100,
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

const ShippingForm = ({ onSubmit }: ShippingFormProps): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const formik = useFormik<iInitialValues>({
    initialValues,
    validationSchema,
    onSubmit: (values: iInitialValues): void => {
      onSubmit({
        ...values,
        weight_value: Number(values.weight_value),
        distance_value: Number(values.distance_value)
      })
    }
  })

  return (
    <Box className='estimate' sx={{ 
      backgroundColor: colors.primary[400],
      transition: 'background-color 0.3s ease-in-out'
    }}>
      <form role="form" onSubmit={formik.handleSubmit}>
        <Typography
          variant='h1'
          sx={{
            textAlign: 'center',
            mb: '1rem',
            textTransform: 'capitalize',
            fontSize: '2rem'
          }}
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
            <FormControl fullWidth>
              <InputLabel id='weight_unit-label'>Weight Unit</InputLabel>
              <Select
                id='weight_unit'
                labelId='weight_unit-label'
                label="Weight Unit"
                {...formik.getFieldProps('weight_unit')}
              >
                <MenuItem value={'g'}>Grams</MenuItem>
                <MenuItem value={'kg'}>Kilograms</MenuItem>
                <MenuItem value={'lb'}>Pounds</MenuItem>
                <MenuItem value={'mt'}>Tonnes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              id='weight_value'
              label="Weight Value"
              inputProps={{
                'aria-label': 'Weight Value'
              }}
              {...formik.getFieldProps('weight_value')}
            />
            {formik.touched.weight_value !== undefined &&
            formik.errors.weight_value !== undefined ? (
              <div>{formik.errors.weight_value}</div>
            ) : null}
          </Grid>
          <Grid item>
            <DistanceUnits
              value={formik.values.distance_unit}
              onChange={(e) => formik.setFieldValue('distance_unit', e.target.value)}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item>
            <TextField
              id='distance_value'
              label="Distance Value"
              inputProps={{
                'aria-label': 'Distance Value'
              }}
              {...formik.getFieldProps('distance_value')}
            />
            {formik.touched.distance_value !== undefined &&
            formik.errors.distance_value !== undefined ? (
              <div>{formik.errors.distance_value}</div>
            ) : null}
          </Grid>
          <Grid item>
            <FormControl fullWidth sx={{ minWidth: '200px' }}>
              <InputLabel id='transport_method-label'>Transport Method</InputLabel>
              <Select
                id='transport_method'
                labelId='transport_method-label'
                label="Transport Method"
                {...formik.getFieldProps('transport_method')}
              >
                <MenuItem value={'ship'}>Ship</MenuItem>
                <MenuItem value={'train'}>Train</MenuItem>
                <MenuItem value={'truck'}>Truck</MenuItem>
                <MenuItem value={'plane'}>Plane</MenuItem>
              </Select>
            </FormControl>
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
