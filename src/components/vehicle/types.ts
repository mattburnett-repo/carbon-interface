export interface VehicleMake {
  id: string
  name: string
}

export interface VehicleMakeResponse {
  data: {
    id: string
    attributes: {
      name: string
    }
  }
}

export interface VehicleMakesProps {
  parentState: {
    setFieldValue: (field: string, value: string | undefined) => void
  }
}

export interface VehicleModel {
  id: string
  year: number
  name: string
}

export interface VehicleModelResponse {
  data: {
    id: string
    attributes: {
      year: number
      name: string
    }
  }
}

export interface VehicleModelsProps {
  parentState: {
    setFieldValue: (field: string, value: string | undefined) => void
  }
  makeId: string
} 