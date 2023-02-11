// FIXME: eslint
/* eslint-disable react/prop-types */

import React from 'react'

import { InputLabel, Select, MenuItem } from '@mui/material'

const DistanceUnits = (props) => {
  const { parentState } = props

  return (
    <>
    <InputLabel id='distance_unit-label'>Distance Unit</InputLabel>
    <Select
      id='distance_unit'
      labelId='distance_unit-label'
      {...parentState.getFieldProps('distance_unit')}
    >
      <MenuItem value={'km'}>Kilometers</MenuItem>
      <MenuItem value={'mi'}>Miles</MenuItem>
    </Select>
    </>

  )
}

export default DistanceUnits

/* eslint-enxable react/prop-types */
