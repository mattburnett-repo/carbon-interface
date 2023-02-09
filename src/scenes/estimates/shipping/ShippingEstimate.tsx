import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import ShippingEstimateDisplay from './ShippingEstimateDisplay'

// import data from '../../../data/shippingResponse.json'

interface iProps {
  type: string
  weight_unit: 'g' | 'kg' | 'lb' | 'mt'
  weight_value: number
  distance_unit: 'mi' | 'km'
  distance_value: number
  transport_method: 'ship' | 'train' | 'truck' | 'plane'
}

const baseURL: string = import.meta.env.VITE_API_BASE_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const ElectricityEstimate: React.FC<iProps> = (
  requestData: iProps
): JSX.Element => {
  const { isLoading, error, data } = useQuery(
    [requestData.type, requestData],
    async () => {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({ ...requestData })
      })

      if (response.status === 422) {
        const { message } = await response.json()

        throw Error(message)
      }

      return await response.json()
    }
  )

  if (isLoading) return <LoadingDisplay />
  if (error !== null) return <ErrorDisplay error={error} />

  return <ShippingEstimateDisplay {...data} />
}

export default ElectricityEstimate
