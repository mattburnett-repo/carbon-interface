import React from 'react'
import { useQuery } from 'react-query'

import LoadingDisplay from '../../../components/LoadingDisplay'
import ErrorDisplay from '../../../components/ErrorDisplay'

import EstimatesDisplay from './EstimatesDisplay'

// import data from '../../../data/allEstimates.json'

const baseURL: string = import.meta.env.VITE_API_ESTIMATES_URL
const apiKey: string = import.meta.env.VITE_API_KEY

interface EstimateResponse {
  data: Array<{
    id: string;
    type: string;
    attributes: {
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
      estimated_at: string;
    };
  }>;
}

interface ErrorResponse {
  message: string;
}

const Estimates = (): JSX.Element => {
  const { isLoading, error, data } = useQuery<EstimateResponse, Error>(['estimate'], async () => {
    const response = await fetch(baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })

    const result = await response.json() as EstimateResponse | ErrorResponse;
    
    if (!response.ok) {
      throw new Error((result as ErrorResponse).message || 'API Error')
    }

    return result as EstimateResponse
  })

  if (isLoading) return <LoadingDisplay />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <LoadingDisplay />

  return <EstimatesDisplay data={data} />
}
export default Estimates
