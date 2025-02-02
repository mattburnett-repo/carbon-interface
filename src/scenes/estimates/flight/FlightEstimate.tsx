import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import FlightEstimateDisplay from './FlightEstimateDisplay'

// import data from '../../../data/flightResponse.json'

import { type iEstimateProps, type iEstimateResponse } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const FlightEstimate: React.FC<iEstimateProps> = (
  requestData: iEstimateProps
): JSX.Element => {
  const { isLoading, error, data } = useQuery<iEstimateResponse>(
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
  if (error instanceof Error) return <ErrorDisplay error={error} />
  if (!data) return <LoadingDisplay />

  return <FlightEstimateDisplay {...data} />
}

export default FlightEstimate
