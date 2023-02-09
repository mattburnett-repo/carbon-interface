import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import FuelCombustionEstimateDisplay from './FuelCombustionEstimateDisplay'

// import data from '../../../data/fuelSourceResponse.json'

interface iProps {
  type: string
  fuel_source_type: string
  fuel_source_unit: string
  fuel_source_value: number
}

const baseURL: string = import.meta.env.VITE_API_BASE_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const FuelCombustionEstimate: React.FC<iProps> = (
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

  return <FuelCombustionEstimateDisplay {...data} />
}

export default FuelCombustionEstimate
