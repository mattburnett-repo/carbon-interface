import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'

interface Props {
  parentState: FormikProps<any>
}

const CabinClassSelect = ({ parentState }: Props): JSX.Element => {
  return (
    <FormControl>
      <InputLabel id="cabin-class-label">Cabin Class</InputLabel>
      <Select
        labelId="cabin-class-label"
        label="Cabin Class"
        {...parentState.getFieldProps('cabin_class')}
      >
        <MenuItem value="economy">Economy</MenuItem>
        <MenuItem value="premium">Premium</MenuItem>
      </Select>
    </FormControl>
  )
}

export default CabinClassSelect 