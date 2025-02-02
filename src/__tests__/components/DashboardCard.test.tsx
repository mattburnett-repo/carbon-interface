import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DashboardCard, { type iProps } from '../../components/DashboardCard'

describe('DashboardCard', () => {
  const cardTypes = [
    {
      title: 'Flight',
      image: '/test-flight-image.jpg',
      endpoint: 'flight'
    },
    {
      title: 'Vehicle',
      image: '/test-vehicle-image.jpg',
      endpoint: 'vehicle'
    },
    {
      title: 'Fuel Combustion',
      image: '/test-fuel-image.jpg',
      endpoint: 'fuel_combustion'
    },
    {
      title: 'Electricity',
      image: '/test-electricity-image.jpg',
      endpoint: 'electricity'
    },
    {
      title: 'Shipping',
      image: '/test-shipping-image.jpg',
      endpoint: 'shipping'
    }
  ] as const

  const renderWithRouter = (props: iProps): ReturnType<typeof render> => {
    return render(
      <BrowserRouter>
        <DashboardCard {...props} />
      </BrowserRouter>
    )
  }

  it.each(cardTypes)('renders $title card with title and image', (cardProps) => {
    renderWithRouter(cardProps)

    expect(screen.getByText(cardProps.title)).toBeInTheDocument()
    expect(screen.getByAltText(`${cardProps.title} image`)).toHaveAttribute('src', cardProps.image)
  })

  it.each(cardTypes)('links to correct route for $title card', (cardProps) => {
    renderWithRouter(cardProps)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/estimates/${cardProps.endpoint}`)
  })

  it('applies hover styles when hovered', () => {
    renderWithRouter(cardTypes[0])

    const card = screen.getByRole('link')
    fireEvent.mouseOver(card)

    expect(card.parentElement).toHaveStyle({
      transform: 'translate(-2px, -5px)'
    })
  })
})
