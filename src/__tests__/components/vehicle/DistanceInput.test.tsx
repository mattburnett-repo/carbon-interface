import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceInput from '../../../components/vehicle/DistanceInput'

describe('DistanceInput', () => {
  const user = userEvent.setup({ delay: null })

  it('renders input field', () => {
    render(<DistanceInput value="" unit="km" onChange={() => {}} />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('displays current unit', () => {
    render(<DistanceInput value="" unit="km" onChange={() => {}} />)
    expect(screen.getByText('km')).toBeInTheDocument()
  })

  // Simplified test with shorter timeout
  it('handles input changes', async () => {
    const onChange = jest.fn()
    render(<DistanceInput value="" unit="km" onChange={onChange} />)
    
    const input = screen.getByRole('spinbutton')
    await user.type(input, '5')
    
    expect(onChange).toHaveBeenCalled()
  }, 1000) // 1 second timeout
}) 