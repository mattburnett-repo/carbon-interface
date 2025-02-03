import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import FuelCombustionEstimateDisplay from './FuelCombustionEstimateDisplay'

// import data from '../../../data/fuelSourceResponse.json'

import { type FuelCombustionEstimate as FuelEstimateType, type iEstimateProps } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const FuelCombustionEstimate = ({ estimateValues }: iEstimateProps): JSX.Element => {
  if (!estimateValues) {
    return <FuelCombustionEstimateDisplay estimate={null} />
  }

  const { isLoading, error, data } = useQuery<FuelEstimateType>(
    ['fuel', estimateValues],
    async () => {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estimateValues)
      })

      if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw Error(message)
      }

      return await response.json()
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

  return <FuelCombustionEstimateDisplay estimate={data} />
}

export default FuelCombustionEstimate
