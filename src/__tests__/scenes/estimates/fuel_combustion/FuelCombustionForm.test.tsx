import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import FuelCombustionForm from '../../../../scenes/estimates/fuel_combustion/FuelCombustionForm'

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

describe('FuelCombustionForm', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('renders initial step with basic fields', () => {
    render(<FuelCombustionForm onSubmit={mockSubmit} />)

    expect(screen.getByRole('heading', { name: /fuel source type/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /fuel source type/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('completes full form journey', async () => {
    render(<FuelCombustionForm onSubmit={mockSubmit} />)

    // Step 1: Fuel Source Type
    const typeSelect = screen.getByRole('button', { name: /fuel source type/i })
    await act(async () => {
      fireEvent.mouseDown(typeSelect)
    })
    await act(async () => {
      const typeOption = screen.getByRole('option', { name: /natural gas/i })
      fireEvent.click(typeOption)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 2: Fuel Source Unit
    await act(async () => {
      expect(screen.getByRole('heading', { name: /fuel source unit/i })).toBeInTheDocument()
    })
    const unitSelect = screen.getByRole('button', { name: /fuel source unit/i })
    await act(async () => {
      fireEvent.mouseDown(unitSelect)
    })
    await act(async () => {
      const unitOption = screen.getByRole('option', { name: /btu/i })
      fireEvent.click(unitOption)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 3: Fuel Source Value
    await act(async () => {
      expect(screen.getByRole('heading', { name: /fuel source value/i })).toBeInTheDocument()
    })
    const valueInput = screen.getByRole('spinbutton', { name: /fuel source value/i })
    await act(async () => {
      fireEvent.change(valueInput, { target: { value: '100' } })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 4: Review & Submit
    await act(async () => {
      expect(screen.getByRole('heading', { name: /review/i })).toBeInTheDocument()
    })
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /get estimate/i }))
    })

    const expectedValues = {
      fuel_source_type: 'ng',
      fuel_source_unit: 'btu',
      fuel_source_value: 100,
      type: 'fuel_combustion'
    }

    expect(mockSubmit).toHaveBeenCalled()
    expect(mockSubmit.mock.calls[0][0]).toEqual(expectedValues)
  })

  it('validates fuel source value', async () => {
    render(<FuelCombustionForm onSubmit={mockSubmit} />)

    // Navigate to value step
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })
    await act(async () => {
      expect(screen.getByRole('heading', { name: /fuel source unit/i })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })
    await act(async () => {
      expect(screen.getByRole('heading', { name: /fuel source value/i })).toBeInTheDocument()
    })

    const valueInput = screen.getByRole('spinbutton', { name: /fuel source value/i })
    await act(async () => {
      fireEvent.change(valueInput, { target: { value: '0' } })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    expect(screen.getByText(/must be greater than 0/i)).toBeInTheDocument()
  })
})