import React from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { FormikProps } from 'formik'
import { listOfCountries } from './CountriesList'
import { LocationOptionElement } from './types'
import { SelectChangeEvent } from '@mui/material/Select'

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
  const [open, setOpen] = React.useState(false)

  const handleChange = (event: SelectChangeEvent<string>) => {
    const syntheticEvent = {
      target: {
        name: 'state',
        value: event.target.value
      }
    }
    parentState.handleChange(syntheticEvent)
    setOpen(false)
  }

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
    <FormControl fullWidth>
      <InputLabel id="state-label">State</InputLabel>
      <Select
        id='state'
        labelId='state-label'
        label="State"
        value={parentState.values.state || ''}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        onBlur={parentState.handleBlur}
        name="state"
      >
        {regionCodes.map((region) => (
          <MenuItem key={region.code} value={region.code}>
            {region.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default RegionCodes 