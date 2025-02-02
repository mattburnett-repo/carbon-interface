interface Make {
  data: {
    id: string
    type: string
    attributes: {
      name: string
      number_of_models: number
    }
  }
}

interface Model {
  data: {
    id: string
    type: string
    attributes: {
      name: string
      year: number
    }
  }
}

export const fetchVehicleMakes = async (): Promise<Make[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_VEHICLE_MAKES_URL}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes')
  }

  return response.json()
}

export const fetchVehicleModels = async (makeId: string): Promise<Model[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_VEHICLE_MODELS_URL}?vehicle_make_id=${makeId}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch vehicle models')
  }

  return response.json()
}

export type { Make, Model } 