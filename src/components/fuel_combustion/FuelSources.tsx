import React from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { FormikProps } from 'formik'
import FuelSourceData from './fuelSourcesData'
import { type iInitialValues } from '../../scenes/estimates/fuel_combustion/types'

interface FuelSource {
  api_name: string
  name: string
  units: { unit: string }[]
}

interface FuelSourceProps {
  parentState: FormikProps<iInitialValues>;
}

// get id/api_name and name for all fuel sources
export const useFuelSources = () => {
  const retVal: { api_name: string; name: string }[] = []

  Object.entries(FuelSourceData)
    .sort(([, a], [, b]) => (a.name > b.name ? 1 : -1))
    .forEach(([, record]) =>
      retVal.push({
        api_name: record.api_name,
        name: record.name
      })
    )

  return retVal
}

export const useFuelSourceName = (idCode: string): string => {
  if (idCode === '') {
    idCode = 'jf'
  }
  return (FuelSourceData as FuelSource[]).find((source) => source.api_name === idCode)?.name || ''
}

export const FuelSourceTypes: React.FC<FuelSourceProps> = ({ parentState }) => {
  const fuelSourceTypes = useFuelSources()

  return (
    <FormControl fullWidth sx={{ minWidth: '200px' }}>
      <InputLabel id="fuel_source_type-label">Fuel Source Type</InputLabel>
      <Select
        id='fuel_source_type'
        labelId='fuel_source_type-label'
        label="Fuel Source Type"
        {...parentState.getFieldProps('fuel_source_type')}
      >
        {fuelSourceTypes.map((type) => (
          <MenuItem key={type.api_name} value={type.api_name}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      {parentState.touched.fuel_source_type !== undefined &&
        parentState.errors.fuel_source_type !== undefined ? (
        <div>{String(parentState.errors.fuel_source_type)}</div>
      ) : null}
    </FormControl>
  )
}

export const useFuelSourceUnits = (name: string) => {
  if (name === '') {
    name = 'jf'
  }
  return (FuelSourceData as FuelSource[]).find((source) => source.api_name === name)?.units || []
}

export const FuelSourceUnits: React.FC<FuelSourceProps> = ({ parentState }) => {
  const fuelSourceUnits = useFuelSourceUnits(parentState.values.fuel_source_type)

  return (
    <FormControl fullWidth sx={{ minWidth: '200px' }}>
      <InputLabel id="fuel_source_unit-label">Fuel Source Unit</InputLabel>
      <Select
        id='fuel_source_unit'
        labelId='fuel_source_unit-label'
        label="Fuel Source Unit"
        {...parentState.getFieldProps('fuel_source_unit')}
      >
        {fuelSourceUnits.map((unit) => (
          <MenuItem key={unit.unit} value={unit.unit}>
            {unit.unit}
          </MenuItem>
        ))}
      </Select>
      {parentState.touched.fuel_source_unit !== undefined &&
        parentState.errors.fuel_source_unit !== undefined ? (
        <div>{String(parentState.errors.fuel_source_unit)}</div>
      ) : null}
    </FormControl>
  )
} 