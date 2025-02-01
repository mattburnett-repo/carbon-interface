import { listOfCountries, regionsEnabled } from '../../../components/regions/CountriesList'
import { LocationOptionElement } from '../../../components/regions/types'

// Mock iso3166-2-db
jest.mock('iso3166-2-db', () => ({
  getDataSet: () => ({}),
  reduce: () => ({
    US: { code: 'US', name: 'United States' },
    CA: { code: 'CA', name: 'Canada' }
  })
}))

describe('CountriesList', () => {
  describe('listOfCountries', () => {
    it('contains all enabled countries', () => {
      expect(Object.keys(listOfCountries).length).toBe(2)
      expect(listOfCountries).toHaveProperty('US', {
        code: 'US',
        name: 'United States',
        regions: expect.any(Array) as Array<{ iso: string; name: string }>
      })
      expect(listOfCountries).toHaveProperty('CA', {
        code: 'CA',
        name: 'Canada',
        regions: expect.any(Array) as Array<{ iso: string; name: string }>
      })
    })

    it('has correct data structure', () => {
      Object.values(listOfCountries).forEach(country => {
        expect(country).toHaveProperty('code')
        expect(country).toHaveProperty('name')
        expect(country).toHaveProperty('regions')
        expect(Array.isArray(country.regions)).toBe(true)
      })
    })
  })

  describe('regionsEnabled', () => {
    it('contains supported countries', () => {
      expect(regionsEnabled).toContain('US')
      expect(regionsEnabled).toContain('CA')
    })
  })
}) 