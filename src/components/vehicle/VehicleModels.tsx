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

const VehicleModels = ({ formik, models = [], loading }: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle_model_id-label">Model</InputLabel>
      <Select
        labelId="vehicle_model_id-label"
        id="vehicle_model_id"
        label="Model"
        name="vehicle_model_id"
        value={formik.values.vehicle_model_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        data-testid="model-select"
        disabled={loading}
      >
        <MenuItem value="" disabled>
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

export default VehicleModels 