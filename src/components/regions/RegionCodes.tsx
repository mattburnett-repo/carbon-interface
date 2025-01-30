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

interface Props {
  parentState: FormikProps<{
    state: string
  }>
  countryCode: string
}

export const useRegionCodes = (countryCode: string): LocationOptionElement[] => {
  const regions = (listOfCountries as unknown as CountryList)[countryCode]?.regions
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

const RegionCodes = ({ parentState, countryCode }: Props): JSX.Element => {
  const regionCodes = useRegionCodes(countryCode)

  return (
    <>
      <InputLabel htmlFor="state" id="state-label">State</InputLabel>
      <Select
        id="state"
        labelId="state-label"
        label="State"
        {...parentState.getFieldProps('state')}
      >
        <MenuItem value="">-- None --</MenuItem>
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