import React, { useState, useEffect } from 'react'

import { Box, Typography, Grid, useTheme, Skeleton } from '@mui/material'

import { tokens } from '../../theme'
import DashboardCard from '../../components/DashboardCard'

type CardData = {
  title: 'Electricity' | 'Flight' | 'Shipping' | 'Vehicle' | 'Fuel Combustion' | 'Show Estimates'
  image: string
  endpoint: 'electricity' | 'flight' | 'shipping' | 'vehicle' | 'fuel_combustion' | 'estimate'
}

// Add fadeIn keyframe animation
const fadeIn = {
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}

const Dashboard: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // Updated grid values for different screen sizes
  const gridConfig = {
    xs: 12,    // Full width on mobile
    sm: 6,     // Two columns on tablet
    md: 6,     // Two columns on small desktop
    lg: 4,     // Three columns on larger screens
    xl: 4      // Three columns on extra large screens
  }

  // Add card effect styles
  const cardEffectStyles = {
    '& > *': {
      transition: 'all 0.3s ease-in-out',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '8px',  // Add margin around cards
      padding: '12px',  // Add padding inside cards
      backgroundColor: colors.primary[400],  // Match background for padding area
      '& .MuiTypography-root': {
        fontSize: { xs: '1.2rem', sm: '1.3rem' },
        fontWeight: 600,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        color: colors.grey[100]
      },
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      }
    }
  }

  const cards: CardData[] = [
    { title: 'Electricity', image: 'lightbulb.jpg', endpoint: 'electricity' },
    { title: 'Flight', image: 'airplane.jpg', endpoint: 'flight' },
    { title: 'Shipping', image: 'shipping-truck.jpg', endpoint: 'shipping' },
    { title: 'Vehicle', image: 'car.jpg', endpoint: 'vehicle' },
    { title: 'Fuel Combustion', image: 'gas-pump.jpg', endpoint: 'fuel_combustion' },
    { title: 'Show Estimates', image: 'search-all.jpg', endpoint: 'estimate' }
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const LoadingSkeleton = () => (
    <Grid item {...gridConfig} sx={cardEffectStyles}>
      <Box sx={{ width: '100%', height: '100%', padding: '8px' }}>
        <Skeleton 
          data-testid="skeleton"
          variant="rectangular" 
          width="100%" 
          height={200}
          sx={{ 
            bgcolor: `${colors.primary[500]}40`,  
            borderRadius: '8px',
            transform: 'scale(0.98)',
            '&::after': {
              background: `linear-gradient(90deg, transparent, ${colors.primary[400]}80, transparent)`  // Increased from 15 to 20
            }
          }}
        />
        <Skeleton 
          data-testid="skeleton"
          variant="text" 
          width="60%" 
          sx={{ 
            mt: 2,
            ml: 1,
            bgcolor: `${colors.primary[500]}40`,  
            borderRadius: '4px',
            transform: 'scale(0.98)'
          }}
        />
      </Box>
    </Grid>
  )

  return (
    <Box
      component="main"
      role="main"
      aria-label="Dashboard"
      className='estimate'
      sx={{
        ...fadeIn,
        animation: 'fadeIn 0.5s ease-out',
        p: { xs: '10px', sm: '15px' },
        m: 'auto',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary[400],
        transition: 'background-color 0.3s ease-in-out'
      }}
    >
      <Typography 
        variant='h1' 
        component="h1"
        aria-label="Carbon Interface API Frontend Dashboard"
        sx={{ 
          textAlign: 'center', 
          mb: '2rem',
          fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
          color: colors.grey[100],
          transition: 'color 0.3s ease-in-out'
        }}
      >
        Carbon Interface API Frontend
      </Typography>
      <Grid 
        container 
        spacing={{ xs: 3, md: 4 }} 
        justifyContent={'center'}
        role="grid"
        aria-label="Estimate Type Cards"
      >
        {isLoading ? (
          // Show loading skeletons
          Array(6).fill(0).map((_: number, index: number) => (
            <LoadingSkeleton key={index} />
          ))
        ) : (
          // Show actual cards
          cards.map((card) => (
            <Grid
              key={card.endpoint}
              item
              {...gridConfig}
              display='flex'
              justifyContent='center'
              role="gridcell"
              aria-label={`${card.title} estimate card`}
              sx={{
                ...cardEffectStyles,
                '& > *:focus-visible': {  // Add keyboard focus styles
                  outline: `2px solid ${colors.grey[100]}`,
                  outlineOffset: '2px'
                }
              }}
            >
              <DashboardCard
                title={card.title}
                image={card.image}
                endpoint={card.endpoint}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  )
}

export default Dashboard
