import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import { iInitialValues } from '../../scenes/estimates/vehicle/types'
import type { VehicleMake } from '../../services/vehicleApi'

interface Props {
  formik: FormikProps<iInitialValues>
  makes?: VehicleMake[]
}

const VehicleMakes = ({ formik, makes = [] }: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle_make_id-label">Make</InputLabel>
      <Select
        labelId="vehicle_make_id-label"
        id="vehicle_make_id"
        label="Make"
        name="vehicle_make_id"
        value={formik.values.vehicle_make_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        data-testid="make-select"
      >
        <MenuItem value="" disabled>Select a make</MenuItem>
        {makes.map(make => (
          <MenuItem key={make.data.id} value={make.data.id}>
            {make.data.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default VehicleMakes 