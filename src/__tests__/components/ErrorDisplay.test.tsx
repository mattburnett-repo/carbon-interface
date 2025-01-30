import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorDisplay from '../../components/ErrorDisplay'

describe('ErrorDisplay', () => {
  const mockError = {
    name: 'Test Error',
    message: 'This is a test error message'
  }

  it('renders error name and message', (): void => {
    render(<ErrorDisplay error={mockError} />)

    expect(screen.getByText('Test Error')).toBeInTheDocument()
    expect(screen.getByText('This is a test error message')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<ErrorDisplay error={mockError} />)

    const container = screen.getByText('Test Error').parentElement
    expect(container).toHaveStyle({ padding: '5rem' })
  })
})
