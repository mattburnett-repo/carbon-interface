import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { FormikProps } from 'formik'
import { listOfCountries } from './CountriesList'
import { LocationOptionElement } from './types'
import { SelectChangeEvent } from '@mui/material/Select'

interface CountryCodesProps<T> {
  parentState: FormikProps<T & {
    country: string
    state: string
  }>
}

export const useCountryCodes = (): LocationOptionElement[] => {
  return Object.entries(listOfCountries)
    .sort(([codeA], [codeB]) => codeA.localeCompare(codeB))
    .map(([, country]) => ({
      code: country.code,
      name: country.name
    }))
}

const CountryCodes = <T,>({ parentState }: CountryCodesProps<T>): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const countryCodes = useCountryCodes()

  // Get first country from sorted list
  const firstCountry = countryCodes[0]?.code
  
  // Ensure we have a valid uppercase country code
  const currentValue = parentState.values.country?.toUpperCase()
  
  // Use current value if valid, otherwise use first country, fallback to 'DE' if list is empty
  const value = countryCodes.some(c => c.code === currentValue) 
    ? currentValue 
    : firstCountry || 'DE'

  const handleChange = (event: SelectChangeEvent<string>) => {
    const syntheticEvent = {
      target: {
        name: 'country',
        value: event.target.value.toUpperCase()
      }
    }
    parentState.handleChange(syntheticEvent)
    setOpen(false)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        id='country'
        labelId='country-label'
        label="Country"
        value={value}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        onBlur={parentState.handleBlur}
        name="country"
      >
        {countryCodes.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CountryCodes 