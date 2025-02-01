import { getDataSet, reduce } from 'iso3166-2-db'
import { LocationOptionElement } from './types'

// Only US and CA have region-level data in the Carbon Interface API
export const regionsEnabled: string[] = ['US', 'CA']

// Only countries supported by Carbon Interface API
const enabledCountries = ['US', 'CA', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EU-27', 'EU-27+1',
  'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT',
  'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB'
].sort()

type CountryData = {
  code: string
  name: string
  sub?: Record<string, { name: string }>
}

// Only get data for enabled countries
const countryData = reduce(getDataSet(), 'en', enabledCountries) as Record<string, CountryData>

type RegionsData = {
  [key: string]: Array<{ iso: string; name: string }>
}

// Add regions data for supported countries
const regionsData: RegionsData = {
  'US': [
    { iso: 'AL', name: 'Alabama' },
    { iso: 'AK', name: 'Alaska' },
    { iso: 'AZ', name: 'Arizona' },
    { iso: 'AR', name: 'Arkansas' },
    { iso: 'CA', name: 'California' },
    { iso: 'CO', name: 'Colorado' },
    { iso: 'CT', name: 'Connecticut' },
    { iso: 'DE', name: 'Delaware' },
    { iso: 'FL', name: 'Florida' },
    { iso: 'GA', name: 'Georgia' },
    { iso: 'HI', name: 'Hawaii' },
    { iso: 'ID', name: 'Idaho' },
    { iso: 'IL', name: 'Illinois' },
    { iso: 'IN', name: 'Indiana' },
    { iso: 'IA', name: 'Iowa' },
    { iso: 'KS', name: 'Kansas' },
    { iso: 'KY', name: 'Kentucky' },
    { iso: 'LA', name: 'Louisiana' },
    { iso: 'ME', name: 'Maine' },
    { iso: 'MD', name: 'Maryland' },
    { iso: 'MA', name: 'Massachusetts' },
    { iso: 'MI', name: 'Michigan' },
    { iso: 'MN', name: 'Minnesota' },
    { iso: 'MS', name: 'Mississippi' },
    { iso: 'MO', name: 'Missouri' },
    { iso: 'MT', name: 'Montana' },
    { iso: 'NE', name: 'Nebraska' },
    { iso: 'NV', name: 'Nevada' },
    { iso: 'NH', name: 'New Hampshire' },
    { iso: 'NJ', name: 'New Jersey' },
    { iso: 'NM', name: 'New Mexico' },
    { iso: 'NY', name: 'New York' },
    { iso: 'NC', name: 'North Carolina' },
    { iso: 'ND', name: 'North Dakota' },
    { iso: 'OH', name: 'Ohio' },
    { iso: 'OK', name: 'Oklahoma' },
    { iso: 'OR', name: 'Oregon' },
    { iso: 'PA', name: 'Pennsylvania' },
    { iso: 'RI', name: 'Rhode Island' },
    { iso: 'SC', name: 'South Carolina' },
    { iso: 'SD', name: 'South Dakota' },
    { iso: 'TN', name: 'Tennessee' },
    { iso: 'TX', name: 'Texas' },
    { iso: 'UT', name: 'Utah' },
    { iso: 'VT', name: 'Vermont' },
    { iso: 'VA', name: 'Virginia' },
    { iso: 'WA', name: 'Washington' },
    { iso: 'WV', name: 'West Virginia' },
    { iso: 'WI', name: 'Wisconsin' },
    { iso: 'WY', name: 'Wyoming' },
    { iso: 'DC', name: 'District of Columbia' }
  ],
  'CA': [
    { iso: 'AB', name: 'Alberta' },
    { iso: 'BC', name: 'British Columbia' },
    { iso: 'MB', name: 'Manitoba' },
    { iso: 'NB', name: 'New Brunswick' },
    { iso: 'NL', name: 'Newfoundland and Labrador' },
    { iso: 'NS', name: 'Nova Scotia' },
    { iso: 'NT', name: 'Northwest Territories' },
    { iso: 'NU', name: 'Nunavut' },
    { iso: 'ON', name: 'Ontario' },
    { iso: 'PE', name: 'Prince Edward Island' },
    { iso: 'QC', name: 'Quebec' },
    { iso: 'SK', name: 'Saskatchewan' },
    { iso: 'YT', name: 'Yukon' }
  ]
}

// Keep only this one
export const listOfCountries: Record<string, LocationOptionElement> = {}
Object.entries(countryData).forEach(([code, data]) => {
  listOfCountries[code] = {
    code,
    name: data.name,
    // Use our manual region data for US and CA, otherwise use library data
    regions: regionsEnabled.includes(code) 
      ? regionsData[code] 
      : Object.entries(data.sub || {}).map(([iso, subData]: [string, { name: string }]) => ({
          iso,
          name: subData.name
        }))
  }
}) 