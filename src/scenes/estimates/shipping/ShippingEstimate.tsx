import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import ShippingEstimateDisplay from './ShippingEstimateDisplay'

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
  data: {
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
}

const ShippingEstimate: React.FC = () => {
  const location = useLocation()
  const state = location.state as LocationState

  const { isLoading, error, data } = useQuery<ApiResponse>(
    ['shipping', state?.values],
    async () => {
      if (!state?.values) throw new Error('No shipping data available')

      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(state.values)
      })

      if (!response.ok) {
        throw new Error('API Error')
      }

      const responseData = await response.json()

      // Validate response structure
      if (!responseData?.data?.attributes || !responseData?.data?.id) {
        throw new Error('API Error')
      }

      return responseData
    },
    {
      enabled: !!state?.values
    }
  )

  if (isLoading) return <LoadingDisplay />
  if (error) return <ErrorDisplay error={error as Error} />
  if (!data) return <div>No shipping data available</div>

  try {
    // Transform API response to match ShippingEstimateDisplay props
    const displayData = {
      weight_unit: data.data.attributes.weight_unit,
      weight_value: data.data.attributes.weight_value,
      distance_unit: data.data.attributes.distance_unit,
      distance_value: data.data.attributes.distance_value,
      transport_method: data.data.attributes.transport_method,
      estimated_at: data.data.attributes.estimated_at,
      id: data.data.id,
      carbon_g: data.data.attributes.carbon_g,
      carbon_lb: data.data.attributes.carbon_lb,
      carbon_kg: data.data.attributes.carbon_kg,
      carbon_mt: data.data.attributes.carbon_mt
    }

    return (
      <Box>
        <ShippingEstimateDisplay values={displayData} />
      </Box>
    )
  } catch (e) {
    return <ErrorDisplay error={new Error('API Error')} />
  }
}

export default ShippingEstimate
