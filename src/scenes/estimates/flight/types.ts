export interface iFlightFormFields {
  type: string
  passengers: number
  legs: iLeg[]
  distance_unit: string
}

export interface iLeg {
  departure_airport: string
  destination_airport: string
  cabin_class: string
}

export interface iEstimateProps {
  type: string
  passengers: number
  legs: []
  distance_unit: 'km' | 'mi'
  cabin_class: 'economy' | 'premium'
}

export interface iDisplayProps {
  data: {
    id: string
    type: string
    attributes: {
      passengers: number
      legs: iLeg[]
      distance_value: number
      distance_unit: string
      estimated_at: string
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
    }
  }
}

export interface iAirportSelectOptiion {
  code: string
  name: string
}

export interface iDisplayInitialValues {
  type: string
  departure_airport: string
  destination_airport: string
  cabin_class: string
  legs: iLeg[]
}
