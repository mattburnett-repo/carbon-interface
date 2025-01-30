import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

interface Props {
  value: string
  onChange: (event: any) => void
  onBlur: (event: any) => void
}

const DistanceUnits = ({ value = 'km', onChange, onBlur }: Props): JSX.Element => {
  return (
    <FormControl>
      <InputLabel id='distance-unit-label'>Distance Unit</InputLabel>
      <Select
        labelId='distance-unit-label'
        label='Distance Unit'
        name="distance_unit"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <MenuItem value='km'>Kilometers</MenuItem>
        <MenuItem value='mi'>Miles</MenuItem>
      </Select>
    </FormControl>
  )
}

export default DistanceUnits 