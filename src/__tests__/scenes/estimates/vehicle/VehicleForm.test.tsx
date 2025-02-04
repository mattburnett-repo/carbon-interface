import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import VehicleForm from '../../../../scenes/estimates/vehicle/VehicleForm'
import * as vehicleApi from '../../../../services/vehicleApi'

// Silence MUI select warnings
const originalError = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (args[0]?.includes('MUI: You have provided an out-of-range value')) return;
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalError;
});

jest.mock('../../../../services/vehicleApi', () => ({
  fetchVehicleMakes: jest.fn().mockResolvedValue([
    {
      data: {
        id: '1',
        attributes: {
          name: 'Toyota'
        }
      }
    }
  ]),
  fetchVehicleModels: jest.fn().mockResolvedValue([
    {
      data: {
        id: '1',
        attributes: {
          name: 'Corolla'
        }
      }
    }
  ])
}))

describe('VehicleForm', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockSubmit.mockClear()
  })

  it('renders initial step with basic fields', async () => {
    await act(async () => {
      render(<VehicleForm onSubmit={mockSubmit} />)
    })

    expect(screen.getByRole('heading', { name: /distance/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /distance/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('completes full form journey', async () => {
    await act(async () => {
      render(<VehicleForm onSubmit={mockSubmit} />)
    })

    // Step 1: Distance
    const distanceInput = screen.getByRole('spinbutton', { name: /distance/i })
    await act(async () => {
      fireEvent.change(distanceInput, { target: { value: '100' } })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 2: Vehicle Make
    expect(screen.getByRole('heading', { name: /vehicle make/i })).toBeInTheDocument()
    const makeSelect = screen.getByRole('button', { name: /vehicle make/i })
    await act(async () => {
      fireEvent.mouseDown(makeSelect)
    })
    await act(async () => {
      const makeOption = screen.getByRole('option', { name: /toyota/i })
      fireEvent.click(makeOption)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 3: Vehicle Model
    expect(screen.getByRole('heading', { name: /vehicle model/i })).toBeInTheDocument()
    const modelSelect = screen.getByRole('button', { name: /vehicle model/i })
    await act(async () => {
      fireEvent.mouseDown(modelSelect)
    })
    await act(async () => {
      const modelOption = screen.getByRole('option', { name: /corolla \(\)/i })
      fireEvent.click(modelOption)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 4: Review & Submit
    expect(screen.getByRole('heading', { name: /review/i })).toBeInTheDocument()
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /get estimate/i }))
    })

    const expectedValues = {
      distance_unit: 'km',
      distance_value: 100,
      vehicle_make_id: '1',
      vehicle_model_id: '1',
      type: 'vehicle'
    }

    expect(mockSubmit).toHaveBeenCalled()
    expect(mockSubmit.mock.calls[0][0]).toEqual(expectedValues)
  })

  it('validates distance value', async () => {
    await act(async () => {
      render(<VehicleForm onSubmit={mockSubmit} />)
    })

    const distanceInput = screen.getByRole('spinbutton', { name: /distance/i })
    await act(async () => {
      fireEvent.change(distanceInput, { target: { value: '0' } })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    expect(screen.getByText(/must be greater than 0/i)).toBeInTheDocument()
  })
})