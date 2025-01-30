import { getDataSet, reduce } from 'iso3166-2-db'
import { LocationOptionElement } from './types'

// these are the countries that Carbon Interface API currently supports
// https://www.notion.so/4b4f41db73254b4b915ba01d55eba7e7?v=4ad0efe7763540ab801fadd9f3bf1ce0
const enabledCountriesList: string[] = [
  'US',
  'CA',
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EU-27',
  'EU-27+1',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'GB'
].sort()

const countryData = reduce(getDataSet(), 'en', enabledCountriesList)
export const listOfCountries: LocationOptionElement[] = Object.values(countryData)

// update this list if/when Carbon Interface API provides region-level coverage for other countries
export const regionsEnabled: string[] = ['US', 'CA'] 