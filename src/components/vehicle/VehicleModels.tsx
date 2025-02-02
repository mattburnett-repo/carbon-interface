import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material'
import { FormikProps } from 'formik'
import { iInitialValues } from '../../scenes/estimates/vehicle/types'
import type { VehicleModel } from '../../services/vehicleApi'

interface Props {
  formik: FormikProps<iInitialValues>
  makeId: string
  models: VehicleModel[]
  loading?: boolean
}

export default function VehicleModels({ formik, models = [], loading }: Props): JSX.Element {
  // Set initial value to first model if no value is selected
  React.useEffect(() => {
    if (models.length > 0 && !formik.values.vehicle_model_id) {
      formik.setFieldValue('vehicle_model_id', models[0].data.id)
    }
  }, [models])

  return (
    <FormControl fullWidth sx={{ minWidth: '200px' }}>
      <InputLabel id="vehicle_model_id-label">Vehicle Model</InputLabel>
      <Select
        labelId="vehicle_model_id-label"
        id="vehicle_model_id"
        label="Vehicle Model"
        {...formik.getFieldProps('vehicle_model_id')}
        value={formik.values.vehicle_model_id || ' '}
        disabled={loading}
      >
        <MenuItem value="">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CircularProgress size={20} /> Loading models...
            </div>
          ) : (
            'Select a model'
          )}
        </MenuItem>
        {models.map(model => (
          <MenuItem key={model.data.id} value={model.data.id}>
            {model.data.attributes.name} ({model.data.attributes.year})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
} 