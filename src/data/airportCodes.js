//  TODO: useMemo() belongs here, somewhere
// import { useMemo } from 'react'

// docs about the data package https://www.npmjs.com/package/airport-iata-codes

/* eslint-disable camelcase */

import allData from 'airport-iata-codes'

export const useAirportCodes = () => {
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

export const useAirportCode = (code) => {
  return allData(code)
}

/* eslint-enable camelcase */
