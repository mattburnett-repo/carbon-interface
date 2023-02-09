//  TODO: definitely needs useMemo()
//    use useMemo in the UI, not here
// import fetch from 'node-fetch'

import vehicleMakes from './vehicleMakes.js'
import vehicleModels from './vehicleModels.js'

// makes
export const useVehicleMakes = () => {
  const retVal = []

  Object.keys(vehicleMakes)
    .sort((a, b) =>
      vehicleMakes[a].data.attributes.name >
      vehicleMakes[b].data.attributes.name
        ? 1
        : -1
    )
    .forEach((record) =>
      retVal.push(
        JSON.parse(
          JSON.stringify({
            id: vehicleMakes[record].data.id,
            name: vehicleMakes[record].data.attributes.name
          })
        )
      )
    )

  return retVal
}

// models
export const useVehicleModels = (id) => {
  console.log('useVehicleModels, id: ', id)
  const retVal = []

  Object.keys(vehicleModels)
    .sort((a, b) =>
      vehicleModels[a].data.attributes.name >
      vehicleModels[b].data.attributes.name
        ? 1
        : -1
    )
    .forEach((record) =>
      retVal.push(
        JSON.parse(
          JSON.stringify({
            id: vehicleModels[record].data.id,
            name: vehicleModels[record].data.attributes.name
          })
        )
      )
    )

  return retVal
}
