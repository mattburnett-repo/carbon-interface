import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceUnits from '../../../components/distance/DistanceUnits'
import { FormikProps } from 'formik'

describe('DistanceUnits', () => {
  const mockParentState: Partial<FormikProps<any>> = {
    values: {
      distance_unit: 'km'
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn()
  }

  it('renders with correct label', () => {
    render(<DistanceUnits parentState={mockParentState as FormikProps<any>} />)
    expect(screen.getByLabelText(/distance unit/i)).toBeInTheDocument()
  })

  it('renders kilometers option', () => {
    render(<DistanceUnits parentState={mockParentState as FormikProps<any>} />)
    expect(screen.getByText('Kilometers')).toBeInTheDocument()
  })

  it('handles selection changes', async () => {
    render(<DistanceUnits parentState={mockParentState as FormikProps<any>} />)
    const select = screen.getByLabelText(/distance unit/i)
    await userEvent.click(select)
    const option = screen.getByText('Miles')
    await userEvent.click(option)
    expect(mockParentState.handleChange).toHaveBeenCalled()
  })

  it('displays the current value', () => {
    render(<DistanceUnits parentState={mockParentState as FormikProps<any>} />)
    expect(screen.getByText('Kilometers')).toBeInTheDocument()
  })
})