/* eslint-disable react/prop-types */
// FIXME: add prop-types

import React from 'react'

import FuelSourceData from './fuelSourcesData.js'

import { InputLabel, Select, MenuItem } from '@mui/material'

// get id/api_name and name for all fuel sources
const useFuelSources = () => {
  const retVal = []

  Object.keys(FuelSourceData)
    .sort((a, b) => (FuelSourceData[a].name > FuelSourceData[b].name ? 1 : -1))
    .forEach((record) =>
      retVal.push(
        JSON.parse(
          JSON.stringify({
            api_name: FuelSourceData[record].api_name,
            name: FuelSourceData[record].name
          })
        )
      )
    )

  return retVal
}

// get fuel source name from api_name
export const useFuelSourceName = (idCode) => {
  if (idCode === '') {
    idCode = 'jf'
  }
  return FuelSourceData.find((source) => source.api_name === idCode).name
}

export const FuelSourceTypes = (props) => {
  const { parentState } = props

  const fuelSourceTypes = useFuelSources()

  return (
    <>
      <InputLabel id='fuel_source_type-label'>
      Fuel Source Type
      </InputLabel>
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
        <div>{parentState.errors.fuel_source_type}</div>
          ) : null}
    </>
  )
}

// get units for a specific api_name
const useFuelSourceUnits = (name) => {
  if (name === '') {
    name = 'jf'
  }

  console.log('name: ', name)
  return FuelSourceData.find((source) => source.api_name === name).units
}

export const FuelSourceUnits = (props) => {
  const { parentState } = props
  const fuelSourceUnits = useFuelSourceUnits(parentState.values.fuel_source_type)

  return (
    <>
      <InputLabel id='fuel_source_unit-label'>
        Fuel Source Unit
      </InputLabel>
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
        <div>{parentState.errors.fuel_source_unit}</div>
          ) : null}
  </>
  )
}

/* eslint-enable react/prop-types */
