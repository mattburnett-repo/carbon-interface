import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'
import VehicleEstimateDisplay from './VehicleEstimateDisplay'

// import data from '../../../data/vehicleResponse.json'

import { type iEstimateProps } from './types'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const VehicleEstimate: React.FC<iEstimateProps> = (
  requestData: iEstimateProps
): JSX.Element => {
  // console.log('estimate requestData: ', requestData)

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

  return <VehicleEstimateDisplay {...data} />
}

export default VehicleEstimate
