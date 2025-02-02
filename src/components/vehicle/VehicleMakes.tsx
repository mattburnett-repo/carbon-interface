import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import type { VehicleMake } from '../../services/vehicleApi'
import { SelectChangeEvent } from '@mui/material/Select'
import { FormikProps } from 'formik'
import { iInitialValues } from '../../scenes/estimates/vehicle/types'

interface Props {
  formik: FormikProps<iInitialValues>
  makes?: VehicleMake[]
}

export default function VehicleMakes({ 
  formik,
  makes = [] 
}: Props): JSX.Element {
  return (
    <FormControl fullWidth sx={{ minWidth: '200px' }}>
      <InputLabel id="vehicle_make_id-label">Vehicle Make</InputLabel>
      <Select
        labelId="vehicle_make_id-label"
        id="vehicle_make_id"
        label="Vehicle Make"
        {...formik.getFieldProps('vehicle_make_id')}
        value={formik.values.vehicle_make_id || ' '}
      >
        <MenuItem value=" ">Select a make</MenuItem>
        {makes.map(make => (
          <MenuItem key={make.data.id} value={make.data.id}>
            {make.data.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
