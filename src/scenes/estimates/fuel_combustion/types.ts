// form
export interface iFuelSourceTypes {
  api_name: string
  name: string
}

export interface iFuelSourceUnits {
  unit: string
}

export interface iFormInitialValues {
  type: string
  fuel_source_type: string
  fuel_source_unit: string
  fuel_source_value: number
}

export interface iDisplayProps {
  data: {
    id: string
    type: string
    attributes: {
      fuel_source_type: string
      fuel_source_unit: string
      fuel_source_value: number
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}
