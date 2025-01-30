import * as React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

/* eslint-disable @typescript-eslint/indent */
export interface iProps {
  title:
    | 'Electricity'
    | 'Flight'
    | 'Shipping'
    | 'Vehicle'
    | 'Fuel Combustion'
    | 'Show Estimates'
  image: string
  endpoint:
    | 'electricity'
    | 'flight'
    | 'shipping'
    | 'vehicle'
    | 'fuel_combustion'
    | 'estimate'
}

const DashboardCard: React.FC<iProps> = ({
  title,
  image,
  endpoint
}: iProps): JSX.Element => {
  return (
    <Card
      variant='outlined'
      sx={{
        width: '250px',
        '&:hover': {
          boxShadow: '5px 5px 25px #868dfb !important',
          transform: 'translate(-2px, -5px)'
        }
      }}
    >
      <CardActionArea component={Link} to={`/estimates/${endpoint}`}>
        <CardMedia
          component='img'
          height='250'
          // put images in 'public' folder, not 'assets'
          // https://stackoverflow.com/questions/68547439/assets-not-showing-after-build-process-with-vite-and-vue3
          image={image}
          alt={`${title} image`}
        />
        <CardContent>
          <Typography gutterBottom variant='h3' component='div'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DashboardCard
