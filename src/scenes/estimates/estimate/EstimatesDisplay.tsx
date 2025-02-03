import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  DataGrid,
  GridToolbar,
  type GridRowsProp,
  type GridColDef
} from '@mui/x-data-grid'
import { tokens } from '../../../theme'

const EstimatesDisplay = (props: any): JSX.Element => {
  const { data } = props
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const rows: GridRowsProp = data.map((row: any, i: number) => {
    return {
      id: row.data.id,
      estimated_at: row.data.attributes.estimated_at,
      carbon_g: row.data.attributes.carbon_g,
      carbon_lb: row.data.attributes.carbon_lb,
      carbon_kg: row.data.attributes.carbon_kg,
      carbon_mt: row.data.attributes.carbon_mt
    }
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'estimated_at', headerName: 'Estimated At', width: 150 },
    { field: 'carbon_g', headerName: 'Carbon (grams)', width: 150 },
    { field: 'carbon_lb', headerName: 'Carbon (pounds)', width: 150 },
    { field: 'carbon_kg', headerName: 'Carbon (kilograms)', width: 150 },
    { field: 'carbon_mt', headerName: 'Carbon (metic tonnes)', width: 150 }
  ]

  return (
    <Box className='estimate' sx={{ minHeight: '85vh' }}>
      <Typography
        variant='h1'
        sx={{
          textAlign: 'center',
          mb: '1rem',
          textTransform: 'capitalize',
          fontSize: '2rem'
        }}
      >
        Estimates
      </Typography>
      <Box sx={{ minHeight: '70vh', width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}

export default EstimatesDisplay
