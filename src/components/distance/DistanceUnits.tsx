import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FormikProps } from 'formik'

interface FormValues {
  distance_unit: string
}

interface Props {
  value: string
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  }
  onBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  }
}

const DistanceUnits = ({ value, onChange, onBlur }: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="distance-unit-label">Distance Unit</InputLabel>
      <Select
        labelId="distance-unit-label"
        label="Distance Unit"
        name="distance_unit"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <MenuItem value="km">Kilometers</MenuItem>
        <MenuItem value="mi">Miles</MenuItem>
      </Select>
    </FormControl>
  )
}

export default DistanceUnits 