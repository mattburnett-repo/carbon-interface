import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, Button, InputLabel, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

import VehicleMakes from '../../../components/vehicle/VehicleMakes'
import VehicleModels from '../../../components/vehicle/VehicleModels'
import DistanceUnits from '../../../components/distance/DistanceUnits'
import { type iInitialValues } from './types'
import { type VehicleMake, fetchVehicleMakes } from '../../../services/vehicleApi'
import { type VehicleModel, fetchVehicleModels } from '../../../services/vehicleApi'

const initialValues: iInitialValues = {
  type: 'vehicle',
  distance_unit: 'km',
  distance_value: 0,
  vehicle_make_id: '',
  vehicle_model_id: '',
}

const validationSchema = yup.object().shape({
  vehicle_make_id: yup.string().required('Vehicle make is required.'),
  vehicle_model_id: yup.string().required('Vehicle model is required.'),
  distance_value: yup
    .number()
    .min(1, 'Distance value must be greater than 0.')
    .required('Distance value is required. Numbers only.')
})

interface VehicleFormProps {
  onSubmit: (values: iInitialValues) => void;
}

const VehicleForm = ({ onSubmit }: VehicleFormProps): JSX.Element => {
  const [makes, setMakes] = useState<VehicleMake[]>([])
  const [models, setModels] = useState<VehicleModel[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingModels, setLoadingModels] = useState(false)
  const [modelCache, setModelCache] = useState<Record<string, VehicleModel[]>>({})

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: iInitialValues): void => {
      onSubmit(values)
    }
  })

  useEffect(() => {
    const getMakes = async () => {
      try {
        const data = await fetchVehicleMakes()
        setMakes(data)
      } catch (err) {
        console.error('Failed to fetch makes:', err)
      } finally {
        setLoading(false)
      }
    }
    getMakes()
  }, [])

  useEffect(() => {
    const getModels = async () => {
      if (!formik.values.vehicle_make_id) return
      
      // Reset model selection when make changes
      formik.setFieldValue('vehicle_model_id', '')
      
      // Check cache first
      if (modelCache[formik.values.vehicle_make_id]) {
        setModels(modelCache[formik.values.vehicle_make_id])
        return
      }

      setLoadingModels(true)
      try {
        const data = await fetchVehicleModels(formik.values.vehicle_make_id)
        setModels(data)
        // Cache the results
        setModelCache(prev => ({
          ...prev,
          [formik.values.vehicle_make_id]: data
        }))
      } catch (err) {
        console.error('Failed to fetch models:', err)
      } finally {
        setLoadingModels(false)
      }
    }
    getModels()
  }, [formik.values.vehicle_make_id, modelCache])

  return (
    <Box className='estimate'>
      <form onSubmit={formik.handleSubmit}>
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
          alignContent='space-around'
          justifyContent='center'
          spacing={5}
        >
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
              name='distance_value'
              label="Distance Value"
              type='number'
              value={formik.values.distance_value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.distance_value && !!formik.errors.distance_value}
              helperText={formik.touched.distance_value && formik.errors.distance_value}
            />
          </Grid>
          <Grid item>
            <VehicleMakes formik={formik} makes={makes} />
            {formik.touched.vehicle_make_id && formik.errors.vehicle_make_id ? (
              <div style={{ color: 'red' }}>{formik.errors.vehicle_make_id}</div>
            ) : null}
          </Grid>
          {formik.values.vehicle_make_id !== '' && (
            <Grid item>
              <VehicleModels 
                formik={formik} 
                makeId={formik.values.vehicle_make_id}
                models={models}
                loading={loadingModels}
              />
              {formik.touched.vehicle_model_id && formik.errors.vehicle_model_id ? (
                <div style={{ color: 'red' }}>{formik.errors.vehicle_model_id}</div>
              ) : null}
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

export default VehicleForm