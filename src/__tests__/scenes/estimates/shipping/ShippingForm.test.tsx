import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ShippingForm from '../../../../scenes/estimates/shipping/ShippingForm'

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

describe('ShippingForm', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('renders initial step with basic fields', () => {
    render(<ShippingForm onSubmit={mockSubmit} />)

    expect(screen.getByRole('heading', { name: /weight/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /weight value/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('completes full form journey', async () => {
    render(<ShippingForm onSubmit={mockSubmit} />)

    // Step 1: Weight
    const weightInput = screen.getByRole('textbox', { name: /weight value/i })
    await act(async () => {
      fireEvent.change(weightInput, { target: { value: '100' } })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 2: Distance
    expect(screen.getByRole('heading', { name: /distance/i })).toBeInTheDocument()
    const distanceInput = screen.getByRole('textbox', { name: /distance value/i })
    await act(async () => {
      fireEvent.change(distanceInput, { target: { value: '100' } })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 3: Transport Method
    expect(screen.getByRole('heading', { name: /transport method/i })).toBeInTheDocument()
    const methodSelect = screen.getByRole('button', { name: /transport method/i })
    await act(async () => {
      fireEvent.mouseDown(methodSelect)
    })
    await act(async () => {
      const methodOption = screen.getByRole('option', { name: /truck/i })
      fireEvent.click(methodOption)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 4: Review & Submit
    expect(screen.getByRole('heading', { name: /review & submit/i })).toBeInTheDocument()
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /get estimate/i }))
    })

    const expectedValues = {
      weight_unit: 'kg',
      weight_value: 100,
      distance_unit: 'km',
      distance_value: 100,
      transport_method: 'truck',
      type: 'shipping'
    }

    expect(mockSubmit).toHaveBeenCalled()
    expect(mockSubmit.mock.calls[0][0]).toEqual(expectedValues)
  })
})