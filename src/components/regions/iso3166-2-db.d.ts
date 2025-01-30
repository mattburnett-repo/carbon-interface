declare module 'iso3166-2-db' {
  interface Region {
    iso: string
    name: string
  }

  interface CountryData {
    [countryCode: string]: {
      name: string
      regions: Region[]
    }
  }

  export function getDataSet(): CountryData
  export function reduce(
    dataset: CountryData,
    language: string,
    countryCodes: string[]
  ): { [key: string]: { code: string; name: string } }
}