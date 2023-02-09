// import { useVehicleMakes } from './vehicles.js'
// console.log('all makes: ', useVehicleMakes())

// import { useVehicleModels } from './vehicles.js'
// console.log('models: ', useVehicleModels())

import {
  useFuelSources,
  useFuelSourceUnits,
  useFuelSourceName
} from './fuelSources.js'

console.log('useFuelSources: ', useFuelSources())
console.log('useFuelSourceUnits: ', useFuelSourceUnits(''))
console.log('useFuelSourceName: ', useFuelSourceName('dfo'))
