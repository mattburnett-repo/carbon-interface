import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import LoadingDisplay from '../../../components/LoadingDisplay'
import VehicleEstimateDisplay from './VehicleEstimateDisplay'
import { type VehicleEstimate, type iInitialValues } from './types'

interface LocationState {
  state: {
    values: iInitialValues
  }
}

export default function VehicleEstimate(): JSX.Element {
  const location = useLocation() as LocationState
  const formValues = location.state.values
  const [estimate, setEstimate] = useState<VehicleEstimate | null>(null)

  useEffect(() => {
    const getEstimate = async () => {
      if (!formValues) return

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
        throw new Error('Failed to get estimate')
      }

      const data = await response.json() as VehicleEstimate
      setEstimate(data)
    }

    getEstimate()
  }, [formValues])

  if (!formValues || !estimate) {
    return <LoadingDisplay />
  }

  return (
    <Box data-testid="vehicle-estimate">
      <VehicleEstimateDisplay estimate={estimate} />
    </Box>
  )
}
