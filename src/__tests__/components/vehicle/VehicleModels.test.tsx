import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VehicleModels from '../../../components/vehicle/VehicleModels'

// Mock fetch response
const mockVehicleModels = {
  '1': {
    data: {
      id: '1',
      attributes: { 
        name: 'Corolla',
        year: 2023
      }
    }
  },
  '2': {
    data: {
      id: '2',
      attributes: { 
        name: 'Camry',
        year: 2022
      }
    }
  }
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockVehicleModels),
    ok: true,
    status: 200
  })
) as jest.Mock

describe('VehicleModels', () => {
  const mockParentState = {
    setFieldValue: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders autocomplete input', async () => {
    await act(async () => {
      render(<VehicleModels parentState={mockParentState} makeId="123" />)
    })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('loads and displays vehicle models sorted by year then name', async () => {
    await act(async () => {
      render(<VehicleModels parentState={mockParentState} makeId="123" />)
    })
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/123/vehicle_models'),
        expect.any(Object)
      )
    })

    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('2023 Corolla 1')
    expect(options[1]).toHaveTextContent('2022 Camry 2')
  })

  it('calls setFieldValue when option is selected', async () => {
    await act(async () => {
      render(<VehicleModels parentState={mockParentState} makeId="123" />)
    })
    
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.click(screen.getByText(/Corolla/))

    expect(mockParentState.setFieldValue).toHaveBeenCalledWith('vehicle_model_id', '1')
  })

  it('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error()))
    render(<VehicleModels parentState={mockParentState} makeId="123" />)

    await waitFor(() => {
      const input = screen.getByRole('combobox')
      expect(input).toBeInTheDocument()
    })
  })

  it('refetches when makeId changes', async () => {
    const { rerender } = render(<VehicleModels parentState={mockParentState} makeId="123" />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/123/vehicle_models'),
        expect.any(Object)
      )
    })

    // Reset the mock before rerender
    jest.clearAllMocks()

    rerender(<VehicleModels parentState={mockParentState} makeId="456" />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/456/vehicle_models'),
        expect.any(Object)
      )
    })
  })
}) 