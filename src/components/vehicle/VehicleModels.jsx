import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@mui/material'

const baseURL = import.meta.env.VITE_API_VEHICLE_MAKES_URL
const apiKey = import.meta.env.VITE_API_KEY

const VehicleModels = (props) => {
  const { parentState, makeId } = props
  const theURL = `${baseURL}/${makeId}/vehicle_models`

  const [apiResponse, setApiResponse] = useState([])

  useEffect(() => {
    fetch(theURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => { return response.json() })
      .then(data => setApiResponse(data))
      .catch((err) => {
        const { message } = err
        throw Error(message)
      })
  }, [makeId])

  const vehicleModels = apiResponse

  // this is the final list
  const vehicleModelsList = []

  Object.keys(vehicleModels)
    .sort((a, b) =>
      vehicleModels[a].data.attributes.name > vehicleModels[b].data.attributes.name
        ? 1
        : -1
    )
    .sort((a, b) =>
      vehicleModels[a].data.attributes.year > vehicleModels[b].data.attributes.year
        ? -1
        : 1
    )
    // dedupe here?
    //    https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
    // .filter((value, index, self) =>
    //   index === self.findIndex((t) => (
    //     t.year === value.year && t.name === value.name
    //   ))
    // )
    .forEach((record) =>
      vehicleModelsList.push(
        JSON.parse(
          JSON.stringify({
            id: vehicleModels[record].data.id,
            year: vehicleModels[record].data.attributes.year,
            name: vehicleModels[record].data.attributes.name
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
          parentState.setFieldValue('vehicle_model_id', v?.id)
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={vehicleModelsList}
        // FIXME: the option.id.substring thing is a hack to get around duplicate entries in the api data
        getOptionLabel={(option) => option.year + '  ' + option.name + ' ' + option.id.substring(0, 5) || ''}
        renderInput={(params) => <TextField {...params} />}
        fullWidth
        sx={{ width: '250px' }}
      />
    </>
  )
}

export default VehicleModels

VehicleModels.propTypes = {
  parentState: PropTypes.object,
  makeId: PropTypes.string
}
