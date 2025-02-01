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
  MenuItem,
  useTheme
} from '@mui/material'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { tokens } from '../../../theme'
import CountryCodes from '../../../components/regions/CountryCodes'
import { regionsEnabled } from '../../../components/regions/CountriesList'
import RegionCodes from '../../../components/regions/RegionCodes'
import { defaultElectricityValues } from './defaults'

import { type iInitialValues, type iFormProps } from './types'

const validationSchema = yup.object().shape({
  electricity_value: yup
    .number()
    .min(1, 'Electricity Value must be greater than 0.')
    .required('Electricity Value is required. Numbers only.')
})

const ElectricityForm: React.FC<iFormProps> = ({ onSubmit, initialValues = defaultElectricityValues }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const navigate = useNavigate()

  const formik = useFormik<iInitialValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values: iInitialValues): void => {
      onSubmit(values)
      navigate(`/estimates/${values.type}`, { state: { values } })
    }
  })

  // Don't modify formik values directly
  const stateValue = regionsEnabled.includes(formik.values.country) 
    ? formik.values.state 
    : ''

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
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
            {formik.touched.electricity_value !== undefined &&
            formik.errors.electricity_value !== undefined ? (
              <div>{formik.errors.electricity_value}</div>
            ) : null}
          </Grid>
          <Grid item>
            <CountryCodes<iInitialValues> parentState={formik} />
          </Grid>
          {regionsEnabled.includes(formik.values.country) && (
            <Grid item>
              <RegionCodes<iInitialValues>
                parentState={formik}
                countryCode={formik.values.country}
              />
            </Grid>
          )}
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

export default ElectricityForm
