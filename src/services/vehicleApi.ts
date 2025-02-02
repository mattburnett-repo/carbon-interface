const modelCache: Record<string, VehicleModel[]> = {}

export interface VehicleMake {
  data: {
    id: string
    type: 'vehicle_make'
    attributes: {
      name: string
      number_of_models: number
      models: Array<{
        id: string
        name: string
        year: number
      }>
    }
  }
}

export interface VehicleModel {
  data: {
    id: string
    type: 'vehicle_model'
    attributes: {
      name: string
      year: number
    }
  }
}

export async function fetchVehicleMakes(): Promise<VehicleMake[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_VEHICLE_MAKES_URL}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes')
  }

  return response.json()
}

export async function fetchVehicleModels(makeId: string): Promise<VehicleModel[]> {
  if (makeId in modelCache) {
    return modelCache[makeId]
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_VEHICLE_MAKES_URL}/${makeId}/vehicle_models`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch vehicle models')
  }

  const models = await response.json() as VehicleModel[]
  // Only cache recent models (last 5 years)
  const currentYear = new Date().getFullYear()
  const filtered = models.filter(model => 
    model.data.attributes.year >= currentYear - 5
  )
  modelCache[makeId] = filtered

  return modelCache[makeId]
} 