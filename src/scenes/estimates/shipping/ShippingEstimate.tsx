import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import ShippingEstimateDisplay from './ShippingEstimateDisplay'

// import data from '../../../data/shippingResponse.json'

import { type iInitialValues, type iDisplayProps } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

interface ErrorResponse {
  message: string
}

const ShippingEstimate: React.FC<iInitialValues> = (
  requestData: iInitialValues
): JSX.Element => {
  const { isLoading, error, data } = useQuery<iDisplayProps['data']>(
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

      if (!response.ok) {
        const errorData = await response.json() as ErrorResponse
        throw Error(errorData.message)
      }

      return await response.json()
    }
  )

  if (error !== null) return <ErrorDisplay error={error as Error} />
  if (isLoading) return <LoadingDisplay />
  if (!data) return <LoadingDisplay />
  return <ShippingEstimateDisplay data={data} />
}

export default ShippingEstimate
