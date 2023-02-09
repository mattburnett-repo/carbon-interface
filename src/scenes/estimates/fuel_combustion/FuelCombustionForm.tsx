// FIXME: resolve these typescript issues
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React, { useMemo } from 'react'
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

import {
  useFuelSources,
  useFuelSourceUnits
  //  FIXME: resolve ts-expect error eslint @'s
  // @ts-expect-error (fix this by typing ./fuelSources file, later)
} from '../../../data/fuelSources.js'

interface iFuelSourceTypes {
  api_name: string
  name: string
}

interface iFuelSourceUnits {
  unit: string
}

interface iInitialValues {
  type: string
  fuel_source_type: string
  fuel_source_unit: string
  fuel_source_value: number
}

const initialValues: iInitialValues = {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: object): void => {
      navigate(`/estimates/${initialValues.type}`, { state: { values } })
    }
  })

  const fuelSourceTypes = useMemo(() => useFuelSources(), [])
  const fuelSourceUnits = useFuelSourceUnits(formik.values.fuel_source_type)

  return (
    <Box className='estimate'>
      <form onSubmit={formik.handleSubmit}>
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
            <InputLabel id='fuel_source_type-label'>
              Fuel Source Type
            </InputLabel>
            <Select
              id='fuel_source_type'
              labelId='fuel_source_type-label'
              {...formik.getFieldProps('fuel_source_type')}
            >
              {fuelSourceTypes.map((type: iFuelSourceTypes) => (
                <MenuItem key={type.api_name} value={type.api_name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.fuel_source_type !== undefined &&
            formik.errors.fuel_source_type !== undefined ? (
              <div>{formik.errors.fuel_source_type}</div>
            ) : null}
          </Grid>
          {formik.values.fuel_source_type !== '' ? (
            <Grid item>
              <InputLabel id='fuel_source_unit-label'>
                Fuel Source Unit
              </InputLabel>
              <Select
                id='fuel_source_unit'
                labelId='fuel_source_unit-label'
                {...formik.getFieldProps('fuel_source_unit')}
              >
                {fuelSourceUnits.map((unit: iFuelSourceUnits) => (
                  <MenuItem key={unit.unit} value={unit.unit}>
                    {unit.unit}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.fuel_source_unit !== undefined &&
              formik.errors.fuel_source_unit !== undefined ? (
                <div>{formik.errors.fuel_source_unit}</div>
              ) : null}
            </Grid>
          ) : null}

          <Grid item>
            <InputLabel id='fuel_source_value-label'>
              Fuel Source Value
            </InputLabel>
            <TextField
              id='fuel_source_value'
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

/* eslint-enable @typescript-eslint/strict-boolean-expressions */
/* eslint-enable @typescript-eslint/no-floating-promises */
