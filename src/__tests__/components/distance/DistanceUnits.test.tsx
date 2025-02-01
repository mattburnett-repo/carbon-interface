import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceUnits from '../../../components/distance/DistanceUnits'

const mockProps = {
  value: 'km',
  distanceUnit: 'km',
  onChange: jest.fn(),
  onBlur: jest.fn()
}

describe('DistanceUnits', () => {
  it('renders with correct label', () => {
    render(<DistanceUnits {...mockProps} />)
    expect(screen.getByLabelText(/distance unit/i)).toBeInTheDocument()
  })

  it('renders kilometers option', async () => {
    render(<DistanceUnits {...mockProps} />)
    const select = screen.getByRole('button', { name: /distance unit/i })
    await userEvent.click(select)
    expect(screen.getByRole('option', { name: /kilometers/i })).toBeInTheDocument()
  })

  it('handles selection changes', async () => {
    const user = userEvent.setup()
    render(<DistanceUnits {...mockProps} />)
    
    const select = screen.getByRole('button', { name: /distance unit/i })
    await user.click(select)
    
    const milesOption = screen.getByRole('option', { name: /miles/i })
    await user.click(milesOption)
    
    expect(mockProps.onChange).toHaveBeenCalled()
  })

  it('displays the current value', () => {
    render(<DistanceUnits {...mockProps} />)
    const select = screen.getByRole('button', { name: /distance unit/i })
    expect(select).toHaveTextContent(/kilometers/i)
  })
})