import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

export default function DistanceUnits({ value, onChange, onBlur }: Props): JSX.Element {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="distance-unit-label">Distance Unit</InputLabel>
      <Select
        label="Distance Unit"
        name="distance_unit"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      >
        <MenuItem value="km">Kilometers</MenuItem>
        <MenuItem value="mi">Miles</MenuItem>
      </Select>
    </FormControl>
  )
} 