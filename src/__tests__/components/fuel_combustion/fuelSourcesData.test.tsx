import fuelSourceData from '../../../components/fuel_combustion/fuelSourcesData'

describe('fuelSourceData', () => {
  it('contains required fuel sources', () => {
    expect(Object.keys(fuelSourceData).length).toBeGreaterThan(0)
  })

  it('has correct data structure', () => {
    Object.values(fuelSourceData).forEach(source => {
      expect(source).toHaveProperty('api_name')
      expect(source).toHaveProperty('name')
      expect(source).toHaveProperty('units')
      expect(Array.isArray(source.units)).toBe(true)
    })
  })

  it('has valid units for each fuel source', () => {
    const validUnits = /^(gal|l|short_ton|kg|btu|gallon|thousand_cubic_feet|barrel)\s*$/
    
    Object.values(fuelSourceData).forEach(source => {
      expect(source.units.length).toBeGreaterThan(0)
      source.units.forEach(unit => {
        expect(unit.unit).toMatch(validUnits)
      })
    })
  })

  it('has unique api_names', () => {
    const apiNames = Object.values(fuelSourceData).map(source => source.api_name)
    const uniqueApiNames = new Set(apiNames)
    expect(apiNames.length).toBe(uniqueApiNames.size)
  })
}) 