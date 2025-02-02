import type { Mock } from 'jest'

export const mockMakes = [
  {
    data: {
      id: "make-1",
      type: "vehicle_make",
      attributes: {
        name: "Toyota",
        number_of_models: 2162
      }
    }
  },
  {
    data: {
      id: "d1e97443-32f4-4d98-b2d1-8bf5928da984",
      type: "vehicle_make",
      attributes: {
        name: "Honda",
        number_of_models: 1055
      }
    }
  }
]

export const mockModels = [
  {
    data: {
      id: "model-1",
      type: "vehicle_model",
      attributes: {
        name: "Camry",
        year: 2020
      }
    }
  },
  {
    data: {
      id: "8268a9b7-17e8-4c8d-acca-57059252afe9",
      type: "vehicle_model",
      attributes: {
        name: "Corolla",
        year: 2020
      }
    }
  }
]

export const fetchVehicleMakes: Mock = jest.fn().mockResolvedValue(mockMakes)
export const fetchVehicleModels: Mock = jest.fn().mockResolvedValue(mockModels) 