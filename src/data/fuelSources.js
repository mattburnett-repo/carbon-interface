import FuelSources from './fuelSourcesData.js'

// get id/api_name and name for all fuel sources
export const useFuelSources = () => {
  const retVal = []

  Object.keys(FuelSources)
    .sort((a, b) => (FuelSources[a].name > FuelSources[b].name ? 1 : -1))
    .forEach((record) =>
      retVal.push(
        JSON.parse(
          JSON.stringify({
            api_name: FuelSources[record].api_name,
            name: FuelSources[record].name
          })
        )
      )
    )

  return retVal
}

// get units for a specific api_name
export const useFuelSourceUnits = (name) => {
  if (name === '') {
    name = 'jf'
  }
  return FuelSources.find((source) => source.api_name === name).units
}

// get fuel source name from api_name
export const useFuelSourceName = (idCode) => {
  if (idCode === '') {
    idCode = 'jf'
  }
  return FuelSources.find((source) => source.api_name === idCode).name
}
