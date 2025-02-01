import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ShippingForm from '../../../../scenes/estimates/shipping/ShippingForm'
import { Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  type: 'shipping',
  distance_value: '1',
  distance_unit: 'km',  // Ensure this is explicitly set to 'km' or 'mi'
  weight_value: '1',
  weight_unit: 'g',
  transport_method: 'truck'
}

const validationSchema = Yup.object({
  distance_value: Yup.number()
    .required('Required')
    .moreThan(0, 'Distance value must be greater than 0'),
  weight_value: Yup.number()
    .required('Required')
    .moreThan(0, 'Weight value must be greater than 0'),
  distance_unit: Yup.string().required('Required'),
  weight_unit: Yup.string().required('Required'),
  transport_method: Yup.string().required('Required')
})

describe('ShippingForm', () => {
  beforeEach(() => {
    // Clear any previous console warnings
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  })
  
  const renderComponent = async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={jest.fn()}
            validateOnMount={true}
          >
            <ShippingForm />
          </Formik>
        </BrowserRouter>
      )
    })
  }

  it('should render form fields', async () => {
    await renderComponent()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText(/weight unit/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/weight value/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/distance unit/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/distance value/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/transport method/i)).toBeInTheDocument()
  })

  it('should have "km" as default distance unit', async () => {
    await renderComponent()
    const distanceUnitSelect = screen.getByTestId('distance-unit-select')
    expect(distanceUnitSelect).toBeInTheDocument()
    expect(distanceUnitSelect.querySelector('input')).toHaveValue('km')
  })

  it('should validate weight value', async () => {
    await renderComponent()
    const weightInput = screen.getByLabelText(/weight value/i)
    
    await act(async () => {
      fireEvent.change(weightInput, { target: { value: '0' } })
      fireEvent.blur(weightInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/weight value must be greater than 0/i)).toBeInTheDocument()
    })
  })

  it('validates distance input', async () => {
    await renderComponent()
    const distanceInput = screen.getByLabelText(/distance value/i)
    
    await act(async () => {
      fireEvent.change(distanceInput, { target: { value: '0' } })
      fireEvent.blur(distanceInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/distance value must be greater than 0/i)).toBeInTheDocument()
    })
  })
}) 