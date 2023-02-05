//  TODO: useMemo() belongs here, somewhere

// docs about the data package: https://www.npmjs.com/package/iso3166-2-db
// usage info: https://codesandbox.io/s/LgBN3qy5j

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

const listOfCountries = reduce(getDataSet(), 'en', enabledCountriesList)

// TODO: update this list if/when Carbon Interface API provides region-level coverage for other countries
export const regionsEnabled = ['US', 'CA']

export const useCountryCodes = () => {
  const retVal = []

  Object.keys(listOfCountries)
    .sort((a, b) =>
      listOfCountries[a].name > listOfCountries[b].name ? 1 : -1
    )
    .forEach((isoCode) =>
      retVal.push(
        // stringify makes useful JSON entries, but surrounds the entries with single quotes
        // wrapping stringify with parse gets rid of the single quotes, which is what we want.
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

//  useRegionsCodes will return regions for any enabled country. this is on purpose.
//    carbon interface api only provides region-level data for a few countries (ie US and CA)
//    filter out region-enabled countries in the UI

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
