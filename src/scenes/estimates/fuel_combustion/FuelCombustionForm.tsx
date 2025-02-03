import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material'

import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  FuelSourceTypes,
  FuelSourceUnits

} from '../../../components/fuel_combustion/FuelSources'

import { type iInitialValues } from './types'

const initialValues: iInitialValues = {
  type: 'fuel_combustion',
  fuel_source_type: 'bit',
  fuel_source_unit: 'btu',
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

interface FuelCombustionFormProps {
  onSubmit: (values: iInitialValues) => void;
}

const FuelCombustionForm = ({ onSubmit }: FuelCombustionFormProps): JSX.Element => {
  const navigate = useNavigate()

  const formik = useFormik<iInitialValues>({
    initialValues,
    validationSchema,
    onSubmit: (values: iInitialValues): void => {
      onSubmit(values)
    }
  })

  return (
    <Box className='estimate'>
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
            <FuelSourceTypes parentState={formik} />
          </Grid>
          {formik.values.fuel_source_type !== '' ? (
            <Grid item>
              <FuelSourceUnits parentState={formik} />
            </Grid>
          ) : null}

          <Grid item>
            <TextField
              id='fuel_source_value'
              label="Fuel Source Value"
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
