import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceUnits from '../../../components/distance/DistanceUnits'

describe('DistanceUnits', () => {
  const user = userEvent.setup({ delay: null })

  it('displays km and mi unit options', async () => {
    const mockOnChange = jest.fn()
    render(<DistanceUnits value="km" onChange={mockOnChange} />)
    
    const select = screen.getByRole('button')
    await user.click(select)
    
    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getByText(/kilometers/i)).toBeInTheDocument()
    expect(within(listbox).getByText(/miles/i)).toBeInTheDocument()
  })

  it('calls onChange when selection changes', async () => {
    const mockOnChange = jest.fn()
    const user = userEvent.setup({ delay: null })

    render(<DistanceUnits value="km" onChange={mockOnChange} />)
    
    const select = screen.getByRole('button')
    await user.click(select)
    await user.click(screen.getByText(/miles/i))
    
    expect(mockOnChange).toHaveBeenCalled()
  })
})