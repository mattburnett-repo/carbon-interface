import { listOfCountries, regionsEnabled } from '../../../components/regions/CountriesList'

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
      expect(listOfCountries.length).toBe(2)
      expect(listOfCountries).toContainEqual({
        code: 'US',
        name: 'United States'
      })
    })

    it('has correct data structure', () => {
      listOfCountries.forEach(country => {
        expect(country).toHaveProperty('code')
        expect(country).toHaveProperty('name')
      })
    })
  })

  describe('regionsEnabled', () => {
    it('contains expected countries', () => {
      expect(regionsEnabled).toContain('US')
      expect(regionsEnabled).toContain('CA')
      expect(regionsEnabled.length).toBe(2)
    })
  })
}) 