// docs about the data package: https://www.npmjs.com/package/iso3166-2-db
// usage info: https://codesandbox.io/s/LgBN3qy5j

//  TODO: useMemo() belongs here, somewhere
import { getDataSet, reduce } from 'iso3166-2-db'

// these are the countries that Carbon Interface API currently supports
// https://www.notion.so/4b4f41db73254b4b915ba01d55eba7e7?v=4ad0efe7763540ab801fadd9f3bf1ce0
const enabledCountriesList = [
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

export const listOfCountries = reduce(getDataSet(), 'en', enabledCountriesList)

// TODO: update this list if/when Carbon Interface API provides region-level coverage for other countries
export const regionsEnabled = ['US', 'CA']
