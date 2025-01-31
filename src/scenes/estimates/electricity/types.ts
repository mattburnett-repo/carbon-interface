// form
export interface iInitialValues {
  type: 'electricity';
  electricity_value: number;
  electricity_unit: 'mwh' | 'kwh';
  country: string;
  state: string;
}

export interface iFormProps {
  onSubmit: (values: iInitialValues) => void;
  initialValues: iInitialValues;
}

// estimate
export interface iEstimateProps {
  estimateValues: iInitialValues;
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
