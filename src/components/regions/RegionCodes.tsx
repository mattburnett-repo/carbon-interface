import React from 'react'
import { InputLabel, Select, MenuItem } from '@mui/material'
import { FormikProps } from 'formik'
import { listOfCountries } from './CountriesList'
import { LocationOptionElement } from './types'

type CountryList = {
  [key: string]: {
    name: string
    regions: Array<{ iso: string; name: string }>
  }
}

interface RegionCodesProps<T> {
  parentState: FormikProps<T & {
    country: string
    state: string
  }>
  countryCode: string
}

export const useRegionCodes = (countryCode: string): LocationOptionElement[] => {
  const regions = listOfCountries[countryCode]?.regions
  if (!regions || !Array.isArray(regions)) {
    return []
  }

  return regions
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((region) => ({
      code: region.iso,
      name: region.name
    }))
}

const RegionCodes = <T,>({ parentState, countryCode }: RegionCodesProps<T>): JSX.Element => {
  const regionCodes = useRegionCodes(countryCode)

  // Set default state when country changes
  React.useEffect(() => {
    // Reset state when country changes
    parentState.handleChange({
      target: {
        name: 'state',
        value: regionCodes[0]?.code || ''
      }
    })
  }, [countryCode]) // Only depend on countryCode changes

  return (
    <>
      <InputLabel htmlFor="state" id="state-label">State</InputLabel>
      <Select
        id="state"
        labelId="state-label"
        label="State"
        value={parentState.values.state || ''}
        onChange={(e) => {
          parentState.handleChange({
            target: {
              name: 'state',
              value: e.target.value
            }
          })
        }}
        onBlur={parentState.handleBlur}
        name="state"
      >
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