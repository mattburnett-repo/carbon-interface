import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VehicleMakes from '../../../components/vehicle/VehicleMakes'

// Mock fetch response
const mockVehicleMakes = {
  '1': {
    data: {
      id: '1',
      attributes: { name: 'Toyota' }
    }
  },
  '2': {
    data: {
      id: '2',
      attributes: { name: 'Honda' }
    }
  }
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockVehicleMakes)
  })
) as jest.Mock

describe('VehicleMakes', () => {
  const mockParentState = {
    setFieldValue: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders autocomplete input', async () => {
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('loads and displays vehicle makes', async () => {
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    expect(screen.getByText('Toyota')).toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
  })

  it('calls setFieldValue when option is selected', async () => {
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.click(screen.getByText('Toyota'))

    expect(mockParentState.setFieldValue).toHaveBeenCalledWith('vehicle_make_id', '1')
  })

  it('handles fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockError = new Error('API Error')
    global.fetch = jest.fn().mockRejectedValueOnce(mockError)
    
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch vehicle makes:', 'API Error')
    })

    consoleSpy.mockRestore()
  })

  it('sorts vehicle makes alphabetically', async () => {
    const unsortedMakes = {
      '1': { data: { id: '1', attributes: { name: 'Zonda' } } },
      '2': { data: { id: '2', attributes: { name: 'Audi' } } }
    }
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(unsortedMakes)
      })
    ) as jest.Mock

    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('Audi')
    expect(options[1]).toHaveTextContent('Zonda')
  })

  it('handles empty response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    ) as jest.Mock

    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })
}) 