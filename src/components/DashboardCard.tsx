import * as React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

/* eslint-disable @typescript-eslint/indent */
interface iProps {
  title:
    | 'Electricity'
    | 'Flight'
    | 'Shipping'
    | 'Vehicle'
    | 'Fuel Combustion'
    | 'Get Specific Estimate'
  image: string
  endpoint:
    | 'electricity'
    | 'flight'
    | 'shipping'
    | 'vehicle'
    | 'fuel-combustion'
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
        maxWidth: 200,
        mt: '80px',
        '&:hover': { boxShadow: 20, transform: 'translate(-2px, -5px)' }
      }}
    >
      <CardActionArea component={Link} to={`/estimates/${endpoint}`}>
        <CardMedia
          component='img'
          height='200'
          image={`/src/assets/${image}`}
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
