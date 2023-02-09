// https://www.notion.so/Carbon-Interface-Fuel-Sources-0166b59ec1514984895cc7dd35836392

const FuelSources = [
  {
    api_name: 'bit',
    name: 'Bituminous Coal',
    units: [{ unit: 'short_ton' }, { unit: 'btu' }]
  },
  {
    api_name: 'dfo',
    name: 'Home Heating and Diesel Fuel (Distillate)',
    units: [{ unit: 'gallon' }, { unit: 'btu' }]
  },
  {
    api_name: 'jf',
    name: 'Jet Fuel',
    units: [{ unit: 'gallon' }, { unit: 'btu' }]
  },
  {
    api_name: 'ker',
    name: 'Kerosene',
    units: [{ unit: 'gallon' }, { unit: 'btu' }]
  },
  {
    api_name: 'lig',
    name: 'Lignite Coal',
    units: [{ unit: 'short_ton ' }, { unit: 'btu' }]
  },
  {
    api_name: 'msw',
    name: 'Municipal Solid Waste',
    units: [{ unit: 'short_ton' }, { unit: 'btu' }]
  },
  {
    api_name: 'ng',
    name: 'Natural Gas',
    units: [{ unit: 'thousand_cubic_feet' }, { unit: 'btu' }]
  },
  {
    api_name: 'pc',
    name: 'Petroleum Coke',
    units: [{ unit: 'gallon' }, { unit: 'btu' }]
  },
  {
    api_name: 'pg',
    name: 'Propane Gas',
    units: [{ unit: 'gallon' }, { unit: 'btu' }]
  },
  {
    api_name: 'rfo',
    name: 'Residual Fuel Oil',
    units: [{ unit: 'gallon' }, { unit: 'btu' }]
  },
  {
    api_name: 'sub',
    name: 'Subbituminous Coal',
    units: [{ unit: 'short_ton' }, { unit: 'btu' }]
  },
  {
    api_name: 'tdf',
    name: 'Tire-Derived Fuel',
    units: [{ unit: 'short_ton' }, { unit: 'btu' }]
  },
  {
    api_name: 'wo',
    name: 'Waste Oil',
    units: [{ unit: 'barrel' }, { unit: 'btu' }]
  }
]

export default FuelSources
