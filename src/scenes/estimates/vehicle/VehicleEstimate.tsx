import React from 'react'
// import { useQuery } from 'react-query'
//
// import LoadingDisplay from '../../../components/LoadingDisplay'
// import ErrorDisplay from '../../../components/ErrorDisplay'
import VehicleEstimateDisplay from './VehicleEstimateDisplay'

import data from '../../../data/vehicleResponse.json'

interface iProps {
  type: string
  distance_unit: 'km' | 'mi'
  distance_value: number
  vehicle_model_id: string
}

// const baseURL: string = import.meta.env.VITE_API_BASE_URL
// const apiKey: string = import.meta.env.VITE_API_KEY

const VehicleEstimate: React.FC<iProps> = (
  requestData: iProps
): JSX.Element => {
  //   const { isLoading, error, data } = useQuery(
  //     [requestData.type, requestData],
  //     async () => {
  //       const response = await fetch(baseURL, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${apiKey}`
  //         },
  //         body: JSON.stringify({ ...requestData })
  //       })
  //
  //       if (response.status === 422) {
  //         const { message } = await response.json()
  //
  //         throw Error(message)
  //       }
  //
  //       return await response.json()
  //     }
  //   )
  //
  //   if (isLoading) return <LoadingDisplay />
  //   if (error !== null) return <ErrorDisplay error={error} />

  return <VehicleEstimateDisplay {...data} />
}

export default VehicleEstimate
