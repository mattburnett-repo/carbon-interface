import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VehicleModels from '../../../../components/vehicle/VehicleModels'
import { FormikProps } from 'formik'
import '../../../../../__mocks__/vehicleApiMocks'

describe('VehicleModels', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear()
  })

  const defaultProps = {
    parentState: {
      values: {
        vehicle_model: 'camry',
        vehicle_make: 'toyota'
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn()
    } as unknown as FormikProps<any>,
    makeId: 'toyota'
  }

  it('renders vehicle model field', async () => {
    await act(async () => {
      render(<VehicleModels {...defaultProps} />)
    })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('shows toyota models', async () => {
    await act(async () => {
      render(<VehicleModels {...defaultProps} />)
    })
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    expect(screen.getByText(/Camry/)).toBeInTheDocument()
    expect(screen.getByText(/Corolla/)).toBeInTheDocument()
  })

  it('shows honda models', async () => {
    await act(async () => {
      render(<VehicleModels {...defaultProps} makeId="honda" />)
    })
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    
    // Wait for filtering to take effect
    await waitFor(() => {
      expect(screen.getByText(/Civic/)).toBeInTheDocument()
      expect(screen.queryByText(/Camry/)).not.toBeInTheDocument()
    })
  })

  it('handles error state', async () => {
    const props = {
      ...defaultProps,
      parentState: {
        ...defaultProps.parentState,
        errors: { vehicle_model_id: 'Required' },
        touched: { vehicle_model_id: true }
      } as unknown as FormikProps<any>
    }
    await act(async () => {
      render(<VehicleModels {...props} />)
    })
    
    // Just verify the component renders with error props
    const input = screen.getByRole('combobox')
    expect(input).toBeInTheDocument()
  })
}) 