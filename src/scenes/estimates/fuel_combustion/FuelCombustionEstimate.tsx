import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import FuelCombustionEstimateDisplay from './FuelCombustionEstimateDisplay'

// import data from '../../../data/fuelSourceResponse.json'

import { type iFormInitialValues, type iDisplayProps } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const FuelCombustionEstimate: React.FC<iFormInitialValues> = (
  requestData: iFormInitialValues
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
        const errorResponse: { message: string } = await response.json()
        throw new Error(errorResponse.message)
      }

      const responseData: { data: iDisplayProps['data'] } = await response.json()
      return responseData.data
    }
  )

  if (isLoading) return <LoadingDisplay />
  if (error !== null) return <ErrorDisplay error={error as Error} />
  if (data === undefined) return <LoadingDisplay />

  return <FuelCombustionEstimateDisplay data={data} />
}

export default FuelCombustionEstimate
