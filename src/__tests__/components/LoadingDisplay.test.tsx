import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingDisplay from '../../components/LoadingDisplay'

describe('LoadingDisplay', () => {
  it('renders the loading progress bar', () => {
    render(<LoadingDisplay />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has correct styling', () => {
    render(<LoadingDisplay />)
    const container = screen.getByTestId('loading-container')
    expect(container).toHaveStyle({
      width: '75%',
      margin: '5px auto auto auto'
    })
  })
})
