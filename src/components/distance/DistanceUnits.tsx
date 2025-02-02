import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  value: string
  onChange: (event: SelectChangeEvent) => void
  onBlur?: (e: React.FocusEvent<any>) => void
  name?: string
}

export default function DistanceUnits({ value, onChange, onBlur }: Props): JSX.Element {
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