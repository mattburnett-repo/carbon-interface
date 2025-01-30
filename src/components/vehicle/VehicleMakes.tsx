import React, { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { VehicleMake, VehicleMakeResponse, VehicleMakesProps } from './types'

const theURL = import.meta.env.VITE_API_VEHICLE_MAKES_URL as string
const apiKey = import.meta.env.VITE_API_KEY as string

const VehicleMakes = ({ parentState }: VehicleMakesProps): JSX.Element => {
  const [vehicleMakes, setVehicleMakes] = useState<Record<string, VehicleMakeResponse>>({})

  useEffect(() => {
    fetch(theURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(response => response.json())
      .then((data: Record<string, VehicleMakeResponse>) => setVehicleMakes(data))
      .catch((err: Error) => {
        console.error('Failed to fetch vehicle makes:', err.message)
        setVehicleMakes({})  // Set empty state on error
      })
  }, [])

  const vehicleMakesList: VehicleMake[] = Object.keys(vehicleMakes)
    .sort((a, b) =>
      vehicleMakes[a].data.attributes.name > vehicleMakes[b].data.attributes.name ? 1 : -1
    )
    .map((record) => ({
      id: vehicleMakes[record].data.id,
      name: vehicleMakes[record].data.attributes.name
    }))

  return (
    <Autocomplete
      disablePortal
      loading
      id='vehicle_make_id'
      onChange={(_, value) => {
        parentState.setFieldValue('vehicle_make_id', value?.id)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={vehicleMakesList}
      getOptionLabel={(option) => option.name || ''}
      renderInput={(params) => <TextField {...params} />}
      fullWidth
      sx={{ width: '250px' }}
    />
  )
}

export default VehicleMakes 