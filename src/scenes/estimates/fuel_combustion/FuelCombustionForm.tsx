import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  useTheme
} from '@mui/material'
import { Formik, FormikProps } from 'formik'
import * as yup from 'yup'
import { tokens } from '../../../theme'
import { type iInitialValues } from './types'
import { FuelSourceTypes, FuelSourceUnits, useFuelSourceName } from '../../../components/fuel_combustion/FuelSources'
import { MultiStepForm } from '../../multi-step-form/MultiStepForm'
import { FormStep } from '../../multi-step-form/FormStep'

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

const FuelCombustionForm = ({ onSubmit }: { onSubmit: (values: iInitialValues) => void }): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const fuelSourceName = useFuelSourceName(formik.values.fuel_source_type)
          
          const handleStepChange = (step: number, isGoingBack: boolean = false) => {
            if (isGoingBack) return true

            switch(step) {
              case 3: // Validating Fuel Source Value
                formik.setFieldTouched('fuel_source_value', true)
                if (!formik.values.fuel_source_value || formik.values.fuel_source_value <= 0) {
                  formik.setFieldError('fuel_source_value', 'Fuel source value must be greater than 0')
                  return false
                }
                return true
              default:
                return true
            }
          }
          
          return (
            <MultiStepForm onStepChange={handleStepChange}>
              {/* Step 1: Fuel Source Type */}
              <FormStep>
                <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                  Fuel Source Type
                </Typography>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} sm={6} md={4}>
                    <FuelSourceTypes parentState={formik} />
                  </Grid>
                </Grid>
              </FormStep>

              {/* Step 2: Fuel Source Unit */}
              <FormStep>
                <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                  Fuel Source Unit
                </Typography>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} sm={6} md={4}>
                    <FuelSourceUnits parentState={formik} />
                  </Grid>
                </Grid>
              </FormStep>

              {/* Step 3: Fuel Source Value */}
              <FormStep>
                <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                  Fuel Source Value
                </Typography>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      id='fuel_source_value'
                      label="Fuel Source Value"
                      type="number"
                      {...formik.getFieldProps('fuel_source_value')}
                    />
                    {formik.touched.fuel_source_value && formik.errors.fuel_source_value ? (
                      <Typography color="error" sx={{ mt: 1 }}>{formik.errors.fuel_source_value}</Typography>
                    ) : null}
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
                      Selected Fuel Source:
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
                        Type: {fuelSourceName}
                      </Typography>
                      <Typography>
                        Unit: {formik.values.fuel_source_unit}
                      </Typography>
                      <Typography>
                        Value: {formik.values.fuel_source_value}
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
          )
        }}
      </Formik>
    </Box>
  )
}

export default FuelCombustionForm