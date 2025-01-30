import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DashboardCard, { type iProps } from '../../components/DashboardCard'

describe('DashboardCard', () => {
  const defaultProps: iProps = {
    title: 'Flight',
    image: '/test-image.jpg',
    endpoint: 'flight'
  } as const

  const renderWithRouter = (props = defaultProps): ReturnType<typeof render> => {
    return render(
      <BrowserRouter>
        <DashboardCard {...props} />
      </BrowserRouter>
    )
  }

  it('renders card with title and image', (): void => {
    renderWithRouter()

    expect(screen.getByText('Flight')).toBeInTheDocument()
    expect(screen.getByAltText('Flight image')).toHaveAttribute('src', '/test-image.jpg')
  })

  it('links to correct route when clicked', () => {
    renderWithRouter()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/estimates/flight')
  })

  it('applies hover styles when hovered', () => {
    renderWithRouter()

    const card = screen.getByRole('link')
    fireEvent.mouseOver(card)

    expect(card.parentElement).toHaveStyle({
      transform: 'translate(-2px, -5px)'
    })
  })
})
