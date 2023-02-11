import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Select, MenuItem } from '@mui/material'

const CabinClassSelect = (props) => {
  const { parentState } = props

  return (
    <>
      <Typography>Cabin Class</Typography>
      <Select id='cabin_class' {...parentState.getFieldProps('cabin_class')}>
        <MenuItem key={'economy'} value={'economy'}>
          Economy
        </MenuItem>
        <MenuItem key={'premium'} value={'premium'}>
          Premium
        </MenuItem>
      </Select>
    </>
  )
}

CabinClassSelect.propTypes = {
  parentState: PropTypes.object
}

export default CabinClassSelect
