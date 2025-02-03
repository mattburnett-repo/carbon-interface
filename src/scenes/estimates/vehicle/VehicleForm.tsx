import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme
} from '@mui/material'
import { Formik, FormikProps } from 'formik'
import * as yup from 'yup'
import { tokens } from '../../../theme'
import { type iInitialValues } from './types'
import DistanceInput from '../../../components/vehicle/DistanceInput'
import VehicleMakes from '../../../components/vehicle/VehicleMakes'
import VehicleModels from '../../../components/vehicle/VehicleModels'
import { MultiStepForm } from '../../multi-step-form/MultiStepForm'
import { FormStep } from '../../multi-step-form/FormStep'
import { type VehicleMake, fetchVehicleMakes } from '../../../services/vehicleApi'
import { type VehicleModel, fetchVehicleModels } from '../../../services/vehicleApi'
import DistanceUnits from '../../../components/distance/DistanceUnits'

const initialValues: iInitialValues = {
  type: 'vehicle',
  distance_unit: 'km',
  distance_value: 0,
  vehicle_make_id: '',
  vehicle_model_id: ''
}

const validationSchema = yup.object().shape({
  vehicle_make_id: yup.string().required('Vehicle make is required.'),
  vehicle_model_id: yup.string().required('Vehicle model is required.'),
  distance_value: yup
    .number()
    .min(1, 'Distance value must be greater than 0.')
    .required('Distance value is required. Numbers only.')
})

const VehicleForm = ({ onSubmit }: { onSubmit: (values: iInitialValues) => void }): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [makes, setMakes] = React.useState<VehicleMake[]>([])
  const [models, setModels] = React.useState<VehicleModel[]>([])
  const [loadingModels, setLoadingModels] = React.useState(false)

  React.useEffect(() => {
    const getMakes = async () => {
      try {
        const data = await fetchVehicleMakes()
        setMakes(data)
      } catch (err) {
        console.error('Failed to fetch makes:', err)
      }
    }
    getMakes()
  }, [])

  return (
    <Box className='estimate' sx={{ backgroundColor: colors.primary[400] }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          React.useEffect(() => {
            if (!formik.values.vehicle_make_id) return
            
            formik.setFieldValue('vehicle_model_id', '')
            setLoadingModels(true)
            
            fetchVehicleModels(formik.values.vehicle_make_id)
              .then(data => setModels(data))
              .catch(err => console.error('Failed to fetch models:', err))
              .finally(() => setLoadingModels(false))
          }, [formik.values.vehicle_make_id])

          const handleStepChange = (step: number, isGoingBack: boolean = false) => {
            if (isGoingBack) return true

            switch(step) {
              case 1: // Validating Distance
                formik.setFieldTouched('distance_value', true)
                if (!formik.values.distance_value || formik.values.distance_value <= 0) {
                  formik.setFieldError('distance_value', 'Distance value must be greater than 0')
                  return false
                }
                return true
              default:
                return true
            }
          }

          const selectedMake = makes.find(make => make.data.id === formik.values.vehicle_make_id)
          const selectedModel = models.find(model => model.data.id === formik.values.vehicle_model_id)

          return (
            <MultiStepForm onStepChange={handleStepChange}>
              {/* Step 1: Distance */}
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
                    <DistanceInput
                      value={String(formik.values.distance_value)}
                      unit={formik.values.distance_unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.distance_value ? formik.errors.distance_value : undefined}
                      required={true}
                    />
                  </Grid>
                </Grid>
              </FormStep>

              {/* Step 2: Vehicle Make */}
              <FormStep>
                <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                  Vehicle Make
                </Typography>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} sm={6} md={4}>
                    <VehicleMakes formik={formik} makes={makes} />
                  </Grid>
                </Grid>
              </FormStep>

              {/* Step 3: Vehicle Model */}
              <FormStep>
                <Typography variant='h1' sx={{ textAlign: 'center', mb: '1rem', fontSize: '2rem' }}>
                  Vehicle Model
                </Typography>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} sm={6} md={4}>
                    <VehicleModels
                      formik={formik}
                      makeId={formik.values.vehicle_make_id}
                      models={models}
                      loading={loadingModels}
                    />
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
                      Vehicle Details:
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
                        Distance: {formik.values.distance_value} {formik.values.distance_unit}
                      </Typography>
                      <Typography>
                        Make: {selectedMake?.data.attributes.name || ''}
                      </Typography>
                      <Typography>
                        Model: {selectedModel?.data.attributes.name || ''}
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

export default VehicleForm