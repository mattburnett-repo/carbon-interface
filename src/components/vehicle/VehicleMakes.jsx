import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@mui/material'

const theURL = import.meta.env.VITE_API_VEHICLE_MAKES_URL
const apiKey = import.meta.env.VITE_API_KEY

const VehicleMakes = (props) => {
  const { parentState } = props

  const [vehicleMakes, setVehicleMakes] = useState([])

  useEffect(() => {
    fetch(theURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => { return response.json() })
      .then(data => setVehicleMakes(data))
      .catch((err) => {
        const { message } = err
        throw Error(message)
      })
  }, [])

  const vehicleMakesList = []

  Object.keys(vehicleMakes)
    .sort((a, b) =>
      vehicleMakes[a].data.attributes.name >
      vehicleMakes[b].data.attributes.name
        ? 1
        : -1
    )
    .forEach((record) =>
      vehicleMakesList.push(
        JSON.parse(
          JSON.stringify({
            id: vehicleMakes[record].data.id,
            name: vehicleMakes[record].data.attributes.name
          })
        )
      )
    )

  return (
    <>
      <Autocomplete
        disablePortal
        loading
        id='vehicle_make_id'
        onChange={(e, v) => {
          parentState.setFieldValue('vehicle_make_id', v?.id)
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={vehicleMakesList}
        getOptionLabel={(option) => option.name || ''}
        renderInput={(params) => <TextField {...params} />}
        fullWidth
        sx={{ width: '250px' }}
      />
    </>
  )
}

export default VehicleMakes

VehicleMakes.propTypes = {
  parentState: PropTypes.object
}
