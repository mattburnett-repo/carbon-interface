import React, { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { VehicleModel, VehicleModelResponse, VehicleModelsProps } from './types'

const baseURL = import.meta.env.VITE_API_VEHICLE_MAKES_URL as string
const apiKey = import.meta.env.VITE_API_KEY as string

const VehicleModels = ({ parentState, makeId }: VehicleModelsProps): JSX.Element => {
  const theURL = `${baseURL}/${makeId}/vehicle_models`
  const [vehicleModels, setVehicleModels] = useState<Record<string, VehicleModelResponse>>({})

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(theURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        })
        const data = await response.json() as Record<string, VehicleModelResponse>
        setVehicleModels(data)
      } catch {
        setVehicleModels({})
      }
    }
    
    fetchModels()
  }, [makeId, theURL])

  const vehicleModelsList: VehicleModel[] = Object.keys(vehicleModels)
    .sort((a, b) =>
      vehicleModels[a].data.attributes.name > vehicleModels[b].data.attributes.name ? 1 : -1
    )
    .sort((a, b) =>
      vehicleModels[a].data.attributes.year > vehicleModels[b].data.attributes.year ? -1 : 1
    )
    .map((record) => ({
      id: vehicleModels[record].data.id,
      year: vehicleModels[record].data.attributes.year,
      name: vehicleModels[record].data.attributes.name
    }))

  return (
    <Autocomplete
      data-testid="vehicle-model-autocomplete"
      disablePortal
      loading
      id='vehicle_model_id'
      onChange={(_, value) => {
        parentState.setFieldValue('vehicle_model_id', value?.id)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={vehicleModelsList}
      getOptionLabel={(option) => `${option.year}  ${option.name} ${option.id.substring(0, 5)}`}
      renderInput={(params) => <TextField {...params} />}
      fullWidth
      sx={{ width: '250px' }}
    />
  )
}

export default VehicleModels 