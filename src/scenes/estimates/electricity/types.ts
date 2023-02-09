// form
export interface iInitialValues {
  type: string
  electricity_unit: 'kwh' | 'mwh'
  electricity_value: number
  country: string
  state: string
}

export interface LocationOptionElement {
  code: string
  name: string

}

// estimate
export interface iEstimateProps {
  type: string
  electricity_unit: 'kwh' | 'mwh'
  electricity_value: number
  country: string
  state?: string
}

// display
export interface iDisplayProps {
  data: {
    id: string
    type: string
    attributes: {
      country: string
      state: string
      electricity_unit: 'kwh' | 'mwh'
      electricity_value: number
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}
