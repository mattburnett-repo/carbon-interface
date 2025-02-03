import React from 'react'
import { useQuery } from 'react-query'
import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import ShippingEstimateDisplay from './ShippingEstimateDisplay'
import { type iEstimateProps } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

interface LocationState {
  values: {
    type: string
    weight_unit: string
    weight_value: number
    distance_unit: string
    distance_value: number
    transport_method: string
  }
}

interface ApiResponse {
  id: string
  type: string
  attributes: {
    weight_unit: string
    weight_value: number
    distance_unit: string
    distance_value: number
    transport_method: string
    estimated_at: string
    carbon_g: number
    carbon_lb: number
    carbon_kg: number
    carbon_mt: number
  }
}

const ShippingEstimate: React.FC<iEstimateProps> = ({ estimateValues }): JSX.Element => {
  if (!estimateValues) {
    return <ShippingEstimateDisplay values={null} />
  }

  const { isLoading, error, data } = useQuery<ApiResponse>(
    ['shipping', estimateValues],
    async () => {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(estimateValues)
      })

      const result = await response.json() as { data: ApiResponse; message?: string }
      
      if (!response.ok) {
        throw new Error(result.message || 'API Error')
      }

      return result.data
    },
    {
      retry: (failureCount, error: unknown) => {
        if ((error as Error).message?.includes('API request limit')) {
          return false
        }
        return failureCount < 3
      }
    }
  )

  if (isLoading) return <LoadingDisplay />
  if (error) return <ErrorDisplay error={error as Error} />
  if (!data) return <LoadingDisplay />

  return <ShippingEstimateDisplay values={data.attributes} />
}

export default ShippingEstimate 