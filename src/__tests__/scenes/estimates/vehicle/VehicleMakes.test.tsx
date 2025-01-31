import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VehicleMakes from '../../../../components/vehicle/VehicleMakes'
import { FormikProps } from 'formik'
import '../../../../../__mocks__/vehicleApiMocks'

describe('VehicleMakes', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear()
  })

  const mockParentState = {
    values: {
      vehicle_make: 'toyota'
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    setFieldValue: jest.fn()
  } as unknown as FormikProps<any>

  it('renders vehicle make field', async () => {
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('shows options when clicked', async () => {
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    expect(screen.getByText(/Toyota/)).toBeInTheDocument()
    expect(screen.getByText(/Honda/)).toBeInTheDocument()
  })

  it('handles selection', async () => {
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    const option = screen.getByText(/Honda/)
    await userEvent.click(option)
    expect(mockParentState.setFieldValue).toHaveBeenCalled()
  })

  it('handles fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockFetch = global.fetch as jest.Mock
    
    mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')))
    
    await act(async () => {
      render(<VehicleMakes parentState={mockParentState} />)
    })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.queryByText(/Toyota/)).not.toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
}) 