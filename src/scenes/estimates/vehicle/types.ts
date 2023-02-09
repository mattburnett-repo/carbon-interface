export interface iInitialValues {
  type: string
  distance_unit: 'km' | 'mi'
  distance_value: number
  vehicle_make_id: string
  vehicle_model_id: string
}

export interface SelectOption {
  id: string
  name: string
}

export interface iEstimateProps {
  type: string
  distance_unit: 'km' | 'mi'
  distance_value: number
  vehicle_model_id: string
}

export interface iDisplayProps {
  data: {
    id: string
    type: string
    attributes: {
      vehicle_make: string
      vehicle_model: string
      vehicle_year: number
      vehicle_model_id: string
      distance_unit: string
      distance_value: number
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}
