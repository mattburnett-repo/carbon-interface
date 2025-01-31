import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'

interface FormValues {
  distance_unit: string
}

interface Props {
  parentState: FormikProps<FormValues>
}

const DistanceUnits = ({ parentState }: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="distance-unit-label">Distance Unit</InputLabel>
      <Select
        labelId="distance-unit-label"
        label="Distance Unit"
        name="distance_unit"
        value={parentState?.values?.distance_unit || ''}
        onChange={parentState?.handleChange || (() => {})}
        onBlur={parentState?.handleBlur || (() => {})}
      >
        <MenuItem value="km">Kilometers</MenuItem>
        <MenuItem value="mi">Miles</MenuItem>
      </Select>
    </FormControl>
  )
}

export default DistanceUnits 