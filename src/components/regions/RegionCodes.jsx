// FIXME: eslint
/* eslint-disable react/prop-types */

import React from 'react'

//  TODO: useMemo() belongs here, somewhere
import { InputLabel, Select, MenuItem } from '@mui/material'

import { listOfCountries } from './CountriesList'

export const useRegionCodes = (countryCode) => {
  const regions = listOfCountries[countryCode].regions

  const retVal = regions
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((region) =>
      // stringify makes useful JSON entries, but surrounds the entries with single quotes
      // wrapping stringify with parse gets rid of the single quotes, which is what we want.
      JSON.parse(JSON.stringify({ code: region.iso, name: region.name }))
    )

  return retVal
}

const RegionCodes = (props) => {
  const { parentState, countryCode } = props
  const regionCodes = useRegionCodes(countryCode)

  return (
    <>
    <InputLabel id='state-label'>State</InputLabel>
      <Select
        id='state'
        labelId='state-select-label'
        {...parentState.getFieldProps('state')}
      >
        <MenuItem key={parentState.initialValues.state} value={parentState.initialValues.state}>
          -- None --
        </MenuItem>
        {regionCodes.map((region) => (
          <MenuItem key={region.code} value={region.code}>
            {region.name}
          </MenuItem>
        ))}
      </Select>
    </>

  )
}

export default RegionCodes

/* eslint-enxable react/prop-types */
