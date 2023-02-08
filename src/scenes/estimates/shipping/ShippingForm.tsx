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

import {
  regionsEnabled,
  useCountryCodes,
  useRegionCodes
  //  FIXME: resolve ts-expect error eslint @'s
  // @ts-expect-error (fix this by typing ./contryCodes file, later)
} from '../../../data/countryCodes.js'

const initialValues = {
  type: 'electricity',
  electricity_unit: 'kwh',
  electricity_value: 1,
  country: 'DE',
  state: ''
}
const validationSchema = yup.object().shape({
  electricity_value: yup
    .number()
    .min(1, 'Electricity Value must be greater than 0.')
    .required('Electricity Value is required. Numbers only.')
})

interface LocationOptionElement {
  code: string
  name: string
}

const ShippingForm = (): JSX.Element => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: object): void => {
      navigate(`/estimates/${initialValues.type}`, { state: { values } })
    }
  })

  const countryCodes = useCountryCodes()
  const regionCodes = useRegionCodes(formik.values.country)

  // if API doesn't yet support state/region for a country,
  //    set state/region value to original value/empty string
  if (!regionsEnabled.includes(formik.values.country)) {
    formik.values.state = initialValues.state
  }

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
          columnGap={'12.5rem'}
        >
          <Grid item>
            <InputLabel id='Shipping_unit-label'>Electricity Unit</InputLabel>
            <Select
              id='electricity_unit'
              labelId='electricity_unit-label'
              {...formik.getFieldProps('electricity_unit')}
            >
              <MenuItem value={'kwh'}>KWH</MenuItem>
              <MenuItem value={'mwh'}>MWH</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id='electricity_value-label'>
              Electricity Value
            </InputLabel>
            <TextField
              id='electricity_value'
              {...formik.getFieldProps('electricity_value')}
            />

            {formik.touched.electricity_value !== undefined &&
            formik.errors.electricity_value !== undefined ? (
              <div>{formik.errors.electricity_value}</div>
            ) : null}
          </Grid>
          <Grid item>
            <InputLabel id='country-label'>Country</InputLabel>
            <Select
              id='country'
              labelId='country-label'
              {...formik.getFieldProps('country')}
            >
              {countryCodes.map((country: LocationOptionElement) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {regionsEnabled.includes(formik.values.country) ? (
            <Grid item>
              <InputLabel id='state-label'>State</InputLabel>
              <Select
                id='state'
                labelId='state-select-label'
                {...formik.getFieldProps('state')}
              >
                <MenuItem key={initialValues.state} value={initialValues.state}>
                  -- None --
                </MenuItem>
                {regionCodes.map((region: LocationOptionElement) => (
                  <MenuItem key={region.code} value={region.code}>
                    {region.name}
                  </MenuItem>
                ))}
              </Select>
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

export default ShippingForm

/* eslint-enable @typescript-eslint/strict-boolean-expressions */
