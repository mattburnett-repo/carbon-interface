import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceUnits from '../../../components/distance/DistanceUnits'

describe('DistanceUnits', () => {
  const mockProps = {
    value: 'km',
    onChange: jest.fn(),
    onBlur: jest.fn()
  }

  it('renders with correct label', () => {
    render(<DistanceUnits {...mockProps} />)
    expect(screen.getByLabelText(/distance unit/i)).toBeInTheDocument()
  })

  it('renders both unit options', async () => {
    render(<DistanceUnits {...mockProps} />)
    const select = screen.getByLabelText(/distance unit/i)
    await userEvent.click(select)
    
    expect(screen.getByRole('option', { name: /kilometers/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /miles/i })).toBeInTheDocument()
  })

  it('handles selection changes', async () => {
    render(<DistanceUnits {...mockProps} />)
    const select = screen.getByLabelText(/distance unit/i)
    await userEvent.click(select)
    await userEvent.click(screen.getByRole('option', { name: /miles/i }))
    
    expect(mockProps.onChange).toHaveBeenCalled()
    const calls = mockProps.onChange.mock.calls
    const event = calls[0][0] as { target: { value: string } }
    expect(event.target.value).toBe('mi')
  })

  it('displays the current value', () => {
    render(<DistanceUnits {...mockProps} />)
    expect(screen.getByText('Kilometers')).toBeInTheDocument()
  })
})