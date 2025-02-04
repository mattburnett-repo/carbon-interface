import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DistanceInput from '../../../components/vehicle/DistanceInput'

describe('DistanceInput', () => {
  it('renders input field', () => {
    render(<DistanceInput value="" unit="km" onChange={() => {}} />)
    expect(screen.getByLabelText('Distance')).toBeInTheDocument()
  })

  it('renders with correct input type', () => {
    render(<DistanceInput value="" unit="km" onChange={() => {}} />)
    expect(screen.getByRole('spinbutton', { name: /distance/i })).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<DistanceInput value="" unit="km" onChange={handleChange} />)
    const input = screen.getByRole('spinbutton', { name: /distance/i })
    fireEvent.change(input, { target: { value: '100' } })
    expect(handleChange).toHaveBeenCalled()
  })
})