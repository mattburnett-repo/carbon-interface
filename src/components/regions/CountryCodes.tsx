import React from 'react'
import { InputLabel, Select, MenuItem } from '@mui/material'
import { FormikProps } from 'formik'
import { listOfCountries } from './CountriesList'
import { LocationOptionElement } from './types'

interface Props {
  parentState: FormikProps<{
    country: string
  }>
}

export const useCountryCodes = (): LocationOptionElement[] => {
  const retVal: LocationOptionElement[] = []

  Object.entries(listOfCountries)
    .sort(([, a], [, b]) => (a.name > b.name ? 1 : -1))
    .forEach(([, country]) =>
      retVal.push({
        code: country.code,
        name: country.name
      })
    )

  return retVal
}

const CountryCodes = ({ parentState }: Props): JSX.Element => {
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