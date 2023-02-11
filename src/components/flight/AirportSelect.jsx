// FIXME: eslint
/* eslint-disable react/prop-types */

import React from 'react'

import {
  Typography,
  Autocomplete,
  TextField
} from '@mui/material'

// docs about the data package https://www.npmjs.com/package/airport-iata-codes
/* eslint-disable camelcase */
import allData from 'airport-iata-codes'

const useAirportCodes = () => {
  const airportCodes = allData()
  const retVal = []

  Object.keys(airportCodes)
    .sort((a, b) =>
      airportCodes[a].iata_code > airportCodes[b].iata_code ? 1 : -1
    )
    .forEach((iata_code) =>
      retVal.push(
        // stringify makes useful JSON entries, but surrounds the entries with single quotes
        // wrapping stringify with parse gets rid of the single quotes, which is what we want.
        JSON.parse(
          JSON.stringify({
            code: airportCodes[iata_code].iata_code,
            name: airportCodes[iata_code].name
          })
        )
      )
    )

  return retVal
}

const AirportSelect = (props) => {
  const { parentState, endpoint, title } = props
  const airportCodes = useAirportCodes()

  return (
    <>
    <Typography>{title}</Typography>
      <Autocomplete
        disablePortal
        id={endpoint}
        onChange={(e, v) => {
          parentState.setFieldValue(endpoint, v?.code)
        }}
        isOptionEqualToValue={(option, value) =>
          option.code === value.code
        }
        options={airportCodes}
        getOptionLabel={(option) => option.code}
        renderInput={(params) => <TextField {...params} />}
      />
      {/* {parentState.touched.endpoint !== undefined &&
      parentState.errors.endpoint !== undefined ? (
        <div>{parentState.errors.endpoint}</div>
          ) : null} */}
    </>
  )
}

export const useAirportCode = (code) => {
  return allData(code)
}

export default AirportSelect

/* eslint-enable react/prop-types */
