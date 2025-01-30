interface FuelSourceData {
  [key: string]: {
    api_name: string
    name: string
    units: { unit: string }[]
  }
}

declare const fuelSourceData: FuelSourceData
export default fuelSourceData 