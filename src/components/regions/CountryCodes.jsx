// FIXME: eslint
/* eslint-disable react/prop-types */

import React from 'react'

import { InputLabel, Select, MenuItem } from '@mui/material'

import { listOfCountries } from './CountriesList'

export const useCountryCodes = () => {
  const retVal = []

  Object.keys(listOfCountries)
    .sort((a, b) =>
      listOfCountries[a].name > listOfCountries[b].name ? 1 : -1
    )
    .forEach((isoCode) =>
      retVal.push(
        JSON.parse(
          JSON.stringify({
            code: listOfCountries[isoCode].iso,
            name: listOfCountries[isoCode].name
          })
        )
      )
    )

  return retVal
}

const CountryCodes = (props) => {
  const { parentState } = props
  const countryCodes = useCountryCodes()

  return (
    <>
      <InputLabel id='country-label'>Country</InputLabel>
        <Select
          id='country'
          labelId='country-label'
          {...parentState.getFieldProps('country')}
        >
          {countryCodes.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
    </>

  )
}

export default CountryCodes

/* eslint-enxable react/prop-types */
