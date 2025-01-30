import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import { iAirportSelectOptiion } from '../../scenes/estimates/flight/types'
import airportCodes from 'airport-iata-codes'

const airports: iAirportSelectOptiion[] = Object.entries(airportCodes).map(([code, name]) => ({
  code,
  name: name as string
}))

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
        <MenuItem value="">Select Airport</MenuItem>
        {airports.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {code} - {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AirportSelect 