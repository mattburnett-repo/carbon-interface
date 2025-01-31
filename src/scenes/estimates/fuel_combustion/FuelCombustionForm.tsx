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

import {
  FuelSourceTypes,
  FuelSourceUnits

} from '../../../components/fuel_combustion/FuelSources'

import { type iFormInitialValues } from './types'

const initialValues: iFormInitialValues = {
  type: 'fuel_combustion',
  fuel_source_type: '',
  fuel_source_unit: '',
  fuel_source_value: 0
}

const validationSchema = yup.object().shape({
  fuel_source_type: yup.string().required('Fuel source type is required.'),
  fuel_source_unit: yup.string().required('Fuel source unit is required.'),
  fuel_source_value: yup
    .number()
    .min(1, 'Fuel source value must be greater than 0.')
    .required('Fuel source value is required.')
})

const FuelCombustionForm = (): JSX.Element => {
  const navigate = useNavigate()

  const formik = useFormik<iFormInitialValues>({
    initialValues,
    validationSchema,
    onSubmit: (values: iFormInitialValues): void => {
      navigate(`/estimates/${values.type}`, { state: { values } })
    }
  })

  return (
    <Box className='estimate'>
      <form role="form" onSubmit={formik.handleSubmit}>
        <Typography
          variant='h1'
          sx={{ textAlign: 'center', mb: '2rem', textTransform: 'capitalize' }}
        >
          Fuel Combustion
        </Typography>
        <Grid
          container
          alignContent={'space-around'}
          justifyContent={'center'}
          columnGap={'5rem'}
          gridTemplateColumns={'5'}
        >
          <Grid item>
            <FuelSourceTypes parentState={formik} />
          </Grid>
          {formik.values.fuel_source_type !== '' ? (
            <Grid item>
              <FuelSourceUnits parentState={formik} />
            </Grid>
          ) : null}

          <Grid item>
            <InputLabel id='fuel_source_value-label'>
              Fuel Source Value
            </InputLabel>
            <TextField
              id='fuel_source_value'
              inputProps={{
                'aria-label': 'Fuel Source Value'
              }}
              {...formik.getFieldProps('fuel_source_value')}
            />
            {formik.touched.fuel_source_value !== undefined &&
            formik.errors.fuel_source_value !== undefined ? (
              <div>{formik.errors.fuel_source_value}</div>
            ) : null}
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

export default FuelCombustionForm
