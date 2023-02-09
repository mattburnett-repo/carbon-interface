import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'

import EstimatesDisplay from './EstimatesDisplay'

// import data from '../../../data/allEstimates.json'

const baseURL: string = import.meta.env.VITE_API_BASE_URL
const apiKey: string = import.meta.env.VITE_API_KEY

const Estimates = (): JSX.Element => {
  const { isLoading, error, data } = useQuery(['estimate'], async () => {
    const response = await fetch(baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })

    if (response.status === 422) {
      const { message } = await response.json()

      throw Error(message)
    }

    return await response.json()
  })

  if (isLoading) return <LoadingDisplay />
  if (error !== null) return <ErrorDisplay error={error} />

  return <EstimatesDisplay data={data} />
}
export default Estimates
