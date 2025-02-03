import React from 'react'
import { FormControl, TextField, FormHelperText } from '@mui/material'

interface iProps {
  value: string
  unit: string
  required?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  error?: string
}

export default function DistanceInput(props: iProps) {
  return (
    <FormControl fullWidth error={!!props.error}>
      <TextField
        name="distance_value"
        label="Distance"
        type="number"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={props.required}
      />
      {props.error && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}