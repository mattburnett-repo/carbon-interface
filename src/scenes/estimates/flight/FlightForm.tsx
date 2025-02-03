import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  useTheme
} from '@mui/material'
import { tokens } from '../../../theme'
import { Formik, FormikProps } from 'formik' 
import * as yup from 'yup'
import DistanceUnits from '../../../components/distance/DistanceUnits'
import AirportSelect from '../../../components/flight/AirportSelect'
import CabinClassSelect from '../../../components/flight/CabinClassSelect'
import { type iFlightFormFields } from './types' 
import { MultiStepForm } from '../../multi-step-form/MultiStepForm'
import { FormStep } from '../../multi-step-form/FormStep'

const initialValues: iFlightFormFields = {
  type: 'flight',
  passengers: 1,
  legs: [],
  distance_unit: 'km',
  cabin_class: 'economy',
  departure_airport: '',
  destination_airport: ''
}

const validationSchema = yup.object().shape({
  passengers: yup
    .number()
    .min(1, 'Passenger Count must be greater than 0.')
    .max(300, 'Passenger Count must be 300 or less.')
    .required('Passenger Count is required. Numbers only.'),
  departure_airport: yup.string().required('Please select a departure airport'),
  destination_airport: yup.string()
    .required('Please select a destination airport')
    .test('not-same-airport', 'Destination airport cannot be the same as departure airport', 
      function(value) {
        return value !== this.parent.departure_airport;
      }
    ),
  cabin_class: yup.string().required('Please select a cabin class')
})

const FlightForm = ({ onSubmit }: { onSubmit: (values: iFlightFormFields) => void }): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const handleStepChange = (formik: FormikProps<iFlightFormFields>, step: number, isGoingBack: boolean = false) => {
    if (isGoingBack) return true

    switch(step) {
      case 1: // Validating Passengers
        formik.setFieldTouched('passengers', true)
        if (!formik.values.passengers || formik.values.passengers < 1) {
          formik.setFieldError('passengers', 'Passenger Count must be greater than 0.')
          return false
        }
        return true
      case 2: // Validating Departure Airport
        formik.setFieldTouched('departure_airport', true)
        if (!formik.values.departure_airport) {
          formik.setFieldError('departure_airport', 'Please select a departure airport')
          return false
        }
        return true
      case 3: // Validating Destination Airport
        formik.setFieldTouched('destination_airport', true)
        if (!formik.values.destination_airport) {
          formik.setFieldError('destination_airport', 'Please select a destination airport')
          return false
        }
        if (formik.values.destination_airport === formik.values.departure_airport) {
          formik.setFieldError('destination_airport', 'Destination airport cannot be the same as departure airport')
          return false
        }
        return true
      case 4: // Validating Cabin Class
        formik.setFieldTouched('cabin_class', true)
        if (!formik.values.cabin_class) {
          formik.setFieldError('cabin_class', 'Please select a cabin class')
          return false
        }
        return true
      default:
        return true
    }
  }

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const leg = {
            departure_airport: values.departure_airport,
            destination_airport: values.destination_airport,
            cabin_class: values.cabin_class
          }
          onSubmit({
            ...values,
            legs: [leg]
          })
        }}
      >
        {(formik) => (
          <MultiStepForm 
            onStepChange={(step, isGoingBack) => handleStepChange(formik, step, isGoingBack)}
          >
            {/* Step 1: Flight Details */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Flight Details
              </Typography>
              <Grid container alignContent='space-around' justifyContent='center' spacing={2} sx={{ px: 1 }}>
                <Grid item>
                  <DistanceUnits 
                    value={formik.values.distance_unit}
                    onChange={(e) => formik.setFieldValue('distance_unit', e.target.value)}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="passengers"
                    label="Passengers"
                    type="number"
                    inputProps={{ "aria-label": "passengers" }}
                    {...formik.getFieldProps('passengers')}
                  />
                  {formik.touched.passengers && formik.errors.passengers ? (
                    <Typography color="error" sx={{ mt: 1 }}>{formik.errors.passengers}</Typography>
                  ) : null}
                </Grid>
              </Grid>
            </FormStep>

            {/* Step 2: Departure Airport */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Departure Airport
              </Typography>
              <Grid 
                container 
                justifyContent='center' 
                alignItems='center'
                direction='column'
                spacing={2}
                sx={{ minHeight: '150px' }}
              >
                <Grid item sx={{ width: '300px' }}>
                  <AirportSelect
                    parentState={formik}
                    endpoint="departure_airport"
                    title="Departure Airport"
                  />
                  {formik.touched.departure_airport && formik.errors.departure_airport ? (
                    <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
                      {formik.errors.departure_airport}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
            </FormStep>

            {/* Step 3: Destination Airport */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Destination Airport
              </Typography>
              <Grid 
                container 
                justifyContent='center' 
                alignItems='center'
                direction='column'
                spacing={2}
                sx={{ minHeight: '150px' }}
              >
                <Grid item sx={{ width: '300px' }}>
                  <AirportSelect
                    parentState={formik}
                    endpoint="destination_airport"
                    title="Destination Airport"
                  />
                  {formik.touched.destination_airport && formik.errors.destination_airport ? (
                    <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
                      {formik.errors.destination_airport}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
            </FormStep>

            {/* Step 4: Cabin Class */}
            <FormStep>
              <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                Cabin Class
              </Typography>
              <Grid 
                container 
                justifyContent='center' 
                alignItems='center'
                direction='column'
                spacing={2}
                sx={{ minHeight: '150px' }}
              >
                <Grid item sx={{ width: '300px' }}>
                  <CabinClassSelect parentState={formik} />
                  {formik.touched.cabin_class && formik.errors.cabin_class ? (
                    <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
                      {formik.errors.cabin_class}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
            </FormStep>

            {/* Step 5: Review & Submit */}
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
                    Flight Details:
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Passengers: {formik.values.passengers}
                  </Typography>
                  <Box 
                    sx={{ 
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>
                        From: {formik.values.departure_airport} → To: {formik.values.destination_airport}
                      </Typography>
                      <Typography>
                        Cabin Class: {formik.values.cabin_class}
                      </Typography>
                    </Box>
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

export default FlightForm