import React from 'react'
import { InputLabel, Select, MenuItem } from '@mui/material'
import { FormikProps } from 'formik'
import FuelSourceData from './fuelSourcesData'

interface FuelSource {
  api_name: string
  name: string
  units: { unit: string }[]
}

export interface FormValues {
  fuel_source_type: string
  fuel_source_unit: string
}

interface Props {
  parentState: FormikProps<FormValues>
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

export const FuelSourceTypes = ({ parentState }: Props): JSX.Element => {
  const fuelSourceTypes = useFuelSources()

  return (
    <>
      <InputLabel id='fuel_source_type-label'>Fuel Source Type</InputLabel>
      <Select
        id='fuel_source_type'
        labelId='fuel_source_type-label'
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
    </>
  )
}

export const useFuelSourceUnits = (name: string) => {
  if (name === '') {
    name = 'jf'
  }
  return (FuelSourceData as FuelSource[]).find((source) => source.api_name === name)?.units || []
}

export const FuelSourceUnits = ({ parentState }: Props): JSX.Element => {
  const fuelSourceUnits = useFuelSourceUnits(parentState.values.fuel_source_type)

  return (
    <>
      <InputLabel id='fuel_source_unit-label'>Fuel Source Unit</InputLabel>
      <Select
        id='fuel_source_unit'
        labelId='fuel_source_unit-label'
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
    </>
  )
} 