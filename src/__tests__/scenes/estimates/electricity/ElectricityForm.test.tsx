import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ElectricityForm from '../../../../scenes/estimates/electricity/ElectricityForm'
import { defaultElectricityValues } from '../../../../scenes/estimates/electricity/defaults'
import { BrowserRouter } from 'react-router-dom'

describe('ElectricityForm', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('renders initial form fields', () => {
    render(
      <BrowserRouter>
        <ElectricityForm onSubmit={mockSubmit} initialValues={defaultElectricityValues} />
      </BrowserRouter>
    )

    expect(screen.getByLabelText('Electricity Unit')).toBeInTheDocument()
    expect(screen.getByLabelText('Electricity Value')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get estimate/i })).toBeInTheDocument()
  })

  it('allows input of electricity value', async () => {
    render(
      <BrowserRouter>
        <ElectricityForm onSubmit={mockSubmit} initialValues={defaultElectricityValues} />
      </BrowserRouter>
    )

    const valueInput = screen.getByLabelText('Electricity Value')
    await act(async () => {
      fireEvent.change(valueInput, { target: { value: '100' } })
    })

    expect(valueInput).toHaveValue('100')
  })

  it('allows changing electricity unit', async () => {
    render(
      <BrowserRouter>
        <ElectricityForm onSubmit={mockSubmit} initialValues={defaultElectricityValues} />
      </BrowserRouter>
    )

    const unitSelect = screen.getByLabelText('Electricity Unit')
    await act(async () => {
      fireEvent.mouseDown(unitSelect)
    })

    const mwhOption = screen.getByRole('option', { name: /mwh/i })
    await act(async () => {
      fireEvent.click(mwhOption)
    })

    expect(unitSelect).toHaveTextContent(/mwh/i)
  })

  it('submits form with valid data', async () => {
    render(
      <BrowserRouter>
        <ElectricityForm onSubmit={mockSubmit} initialValues={defaultElectricityValues} />
      </BrowserRouter>
    )

    // Fill in required fields
    const valueInput = screen.getByLabelText('Electricity Value')
    await act(async () => {
      fireEvent.change(valueInput, { target: { value: '100' } })
    })

    // Submit form
    const submitButton = screen.getByRole('button', { name: /get estimate/i })
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        electricity_value: '100',
        electricity_unit: 'kwh'
      })
    )
  })

  it('shows validation error for invalid electricity value', async () => {
    render(
      <BrowserRouter>
        <ElectricityForm onSubmit={mockSubmit} initialValues={defaultElectricityValues} />
      </BrowserRouter>
    )

    const valueInput = screen.getByLabelText('Electricity Value')
    await act(async () => {
      fireEvent.change(valueInput, { target: { value: '-1' } })
    })

    const submitButton = screen.getByRole('button', { name: /get estimate/i })
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(screen.getByText(/electricity value must be greater than 0/i)).toBeInTheDocument()
  })
})