export interface iInitialValues {
  type: string
  weight_unit: 'g' | 'kg' | 'lb' | 'mt'
  weight_value: number
  distance_unit: 'mi' | 'km'
  distance_value: number
  transport_method: 'ship' | 'train' | 'truck' | 'plane'
}

export interface iDisplayProps {
  data: {
    id: string
    type: string
    attributes: {
      weight_unit: 'g' | 'kg' | 'lb' | 'mt'
      weight_value: number
      distance_unit: 'mi' | 'km'
      distance_value: number
      transport_method: 'ship' | 'train' | 'truck' | 'plane'
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}
