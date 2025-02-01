import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import { iAirportSelectOptiion } from '../../scenes/estimates/flight/types'
import airportsData from '../../data/airports.json'

const airports: iAirportSelectOptiion[] = airportsData.airports

interface Props {
  parentState: FormikProps<any>
  endpoint: string
  title: string
}

const AirportSelect = ({ parentState, endpoint, title }: Props): JSX.Element => {
  return (
    <FormControl>
      <InputLabel id={`${endpoint}-label`}>{title}</InputLabel>
      <Select
        labelId={`${endpoint}-label`}
        label={title}
        {...parentState.getFieldProps(endpoint)}
      >
        <MenuItem value="Select Airport" disabled>Select Airport</MenuItem>
        {airports.map(({ code, name, region }) => (
          <MenuItem key={code} value={code}>
            {code} - {name} ({region})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AirportSelect 