export interface iInitialValues {
  type: string
  weight_unit: 'g' | 'kg' | 'lb' | 'mt'
  weight_value: number
  distance_unit: 'mi' | 'km'
  distance_value: number
  transport_method: 'ship' | 'train' | 'truck' | 'plane'
}

export interface iEstimateProps {
  estimateValues: iInitialValues | null;
}

export interface iDisplayProps {
  values: {
    weight_unit: string
    weight_value: number
    distance_unit: string
    distance_value: number
    transport_method: string
    estimated_at?: string
    id?: string
    carbon_g?: number
    carbon_lb?: number
    carbon_kg?: number
    carbon_mt?: number
  } | null
}
