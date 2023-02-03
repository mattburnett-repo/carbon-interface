// FIXME: fix this typescript issue
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

//  FIXME: create a type for this
import {
  regionsEnabled,
  useCountryCodes,
  useRegionCodes
  //  @ts-expect-error fix this by creating type in file
} from '../../../data/countryCodes.js'

const initialValues = {
  type: 'electricity',
  electricity_unit: 'kwh',
  electricity_value: 0,
  country: 'DE',
  state: ''
}
const validationSchema = yup.object().shape({
  electricity_value: yup
    .number()
    .required('Electricity Value is required. Numbers only.')
})

interface Country {
  code: string
  name: string
}
interface Region {
  code: string
  name: string
}

const ElectricityForm = (): JSX.Element => {
  const navigate = useNavigate()
  const countryCodes = useCountryCodes()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: object): void => {
      navigate('/estimates/electricity', { state: { values } })
    }
  })

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
            <InputLabel id='electricity_unit-label'>
              Electricity Unit
            </InputLabel>
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

            {formik.touched.electricity_value &&
            formik.errors.electricity_value ? (
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
              {countryCodes.map((country: Country) => (
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
                {regionCodes.map((region: Region) => (
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

/* eslint-enable @typescript-eslint/strict-boolean-expressions */

export default ElectricityForm
