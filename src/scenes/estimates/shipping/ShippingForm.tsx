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
import { Formik } from 'formik'
import * as yup from 'yup'
import { tokens } from '../../../theme'
import { type iInitialValues } from './types'
import DistanceUnits from '../../../components/distance/DistanceUnits'
import { MultiStepForm } from '../../multi-step-form/MultiStepForm'
import { FormStep } from '../../multi-step-form/FormStep'

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

const ShippingForm = ({ onSubmit }: { onSubmit: (values: iInitialValues) => void }): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <MultiStepForm>
            {/* Step 1: Weight */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Weight
              </Typography>
              <Grid container justifyContent='center' spacing={2}>
                <Grid item>
                  <FormControl>
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
                  {formik.touched.weight_value && formik.errors.weight_value ? (
                    <Typography color="error" sx={{ mt: 1 }}>{formik.errors.weight_value}</Typography>
                  ) : null}
                </Grid>
              </Grid>
            </FormStep>

            {/* Step 2: Distance */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Distance
              </Typography>
              <Grid container justifyContent='center' spacing={2}>
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
                  {formik.touched.distance_value && formik.errors.distance_value ? (
                    <Typography color="error" sx={{ mt: 1 }}>{formik.errors.distance_value}</Typography>
                  ) : null}
                </Grid>
              </Grid>
            </FormStep>

            {/* Step 3: Transport Method */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Transport Method
              </Typography>
              <Grid container justifyContent='center'>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
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
            </FormStep>

            {/* Step 4: Review & Submit */}
              <FormStep isSubmitStep={true}>
                <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                  Review & Submit
                </Typography>
                <Grid 
                  container 
                  justifyContent='center' 
                  alignItems='center'
                  direction='column'
                  spacing={2}
                >
                  <Grid item sx={{ width: '100%', maxWidth: '600px' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Shipping Details:
                    </Typography>
                    <Box 
                      sx={{ 
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1
                      }}
                    >
                      <Typography>
                        Weight: {formik.values.weight_value} {formik.values.weight_unit}
                      </Typography>
                      <Typography>
                        Distance: {formik.values.distance_value} {formik.values.distance_unit}
                      </Typography>
                      <Typography>
                        Transport Method: {formik.values.transport_method}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={() => formik.handleSubmit()}
                    >
                      Get Estimate
                    </Button>
                  </Grid>
                </Grid>
              </FormStep>
          </MultiStepForm>
        )}
      </Formik>
    </Box>
  )
}

export default ShippingForm