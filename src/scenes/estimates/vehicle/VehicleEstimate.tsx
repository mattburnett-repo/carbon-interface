import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import LoadingDisplay from '../../../components/LoadingDisplay'
import VehicleEstimateDisplay from './VehicleEstimateDisplay'
import { type VehicleEstimate, type iInitialValues } from './types'
import { useQuery } from 'react-query'
import ErrorDisplay from '../../../components/ErrorDisplay'

interface LocationState {
  state: {
    values: iInitialValues
  }
}

export default function VehicleEstimate(): JSX.Element {
  const location = useLocation() as LocationState
  const formValues = location.state.values

  const { isLoading, error, data } = useQuery<VehicleEstimate>(
    ['vehicle', formValues],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ESTIMATES_URL}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'vehicle',
            distance_unit: formValues.distance_unit,
            distance_value: formValues.distance_value,
            vehicle_model_id: formValues.vehicle_model_id
          })
        }
      )

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

  if (isLoading) {
    return <LoadingDisplay />
  }
  if (error) return <ErrorDisplay error={error as Error} />
  if (!data) return <LoadingDisplay />

  return (
    <Box data-testid="vehicle-estimate">
      <VehicleEstimateDisplay estimate={data} />
    </Box>
  )
}
