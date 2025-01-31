import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import ElectricityEstimateDisplay from './ElectricityEstimateDisplay'

// import data from '../../../data/electricityResponse.json'

import { type iEstimateProps, iInitialValues } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

interface EstimateResponse {
  data: {
    id: string
    type: string
    attributes: {
      carbon_g: number
      carbon_lb: number
      carbon_kg: number
      carbon_mt: number
      estimated_at: string
      electricity_unit: 'mwh' | 'kwh'
      electricity_value: number
      country: string
      state: string
    }
  }
}

interface ErrorResponse {
  message: string
}

const ElectricityEstimate: React.FC<iEstimateProps> = ({ estimateValues }) => {
  const { isLoading, error, data } = useQuery<EstimateResponse, Error>(
    [estimateValues.type, estimateValues],
    async () => {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({ ...estimateValues })
      })

      // const result = await response.json() as ApiResponse;
      const result = await response.json() as EstimateResponse | ErrorResponse | { message: string };
      
      if (!response.ok) {
        throw new Error((result as ErrorResponse).message || 'API Error')
      }

      return result as EstimateResponse;
    }
  )

  if (isLoading) return <LoadingDisplay />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <LoadingDisplay />

  return <ElectricityEstimateDisplay {...data} />
}

export default ElectricityEstimate
