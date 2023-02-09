import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import FlightEstimateDisplay from './FlightEstimateDisplay'

// import data from '../../../data/flightResponse.json'

interface iProps {
  type: string
  passengers: number
  legs: []
  distance_unit: 'km' | 'mi'
  cabin_class: 'economy' | 'premium'
}

const baseURL: string = import.meta.env.VITE_API_BASE_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const FlightEstimate: React.FC<iProps> = (requestData: iProps): JSX.Element => {
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

  return <FlightEstimateDisplay {...data} />
}

export default FlightEstimate