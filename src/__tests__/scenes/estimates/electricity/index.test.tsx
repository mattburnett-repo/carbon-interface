import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { tokens } from '../../../../theme'
import Electricity from '../../../../scenes/estimates/electricity'
import { iInitialValues } from '../../../../scenes/estimates/electricity/types'

// Mock child components
jest.mock('../../../../scenes/estimates/electricity/ElectricityForm', () => ({
  __esModule: true,
  default: ({ onSubmit, initialValues }: { onSubmit: (values: iInitialValues) => void, initialValues: iInitialValues }) => (
    <div data-testid="electricity-form">
      Electricity Form
      <button onClick={() => onSubmit(initialValues)}>Submit</button>
    </div>
  )
}))

jest.mock('../../../../scenes/estimates/electricity/ElectricityEstimate', () => ({
  __esModule: true,
  default: ({ estimateValues }: { estimateValues: iInitialValues }) => (
    <div data-testid="electricity-estimate">
      Electricity Estimate
      <pre>{JSON.stringify(estimateValues)}</pre>
    </div>
  )
}))

// Mock theme
const mockTheme = {
  palette: { mode: 'light' }
}
const mockColors = tokens(mockTheme.palette.mode)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => mockTheme
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}))

describe('Electricity', () => {
  const mockLocation = useLocation as jest.Mock

  beforeEach(() => {
    mockLocation.mockReset()
  })

  it('should render form with default values when no state exists', () => {
    mockLocation.mockReturnValue({ state: null })

    render(
      <BrowserRouter>
        <Electricity />
      </BrowserRouter>
    )

    const form = screen.getByTestId('electricity-form')
    expect(form).toBeInTheDocument()
    expect(screen.queryByTestId('electricity-estimate')).not.toBeInTheDocument()
  })

  it('should render estimate with provided values', () => {
    const mockValues: iInitialValues = {
      type: 'electricity',
      electricity_value: 100,
      electricity_unit: 'kwh',
      country: 'us',
      state: 'ca'
    }

    mockLocation.mockReturnValue({ state: { values: mockValues } })

    render(
      <BrowserRouter>
        <Electricity />
      </BrowserRouter>
    )

    const estimate = screen.getByTestId('electricity-estimate')
    expect(estimate).toBeInTheDocument()
    expect(screen.getByText(JSON.stringify(mockValues))).toBeInTheDocument()
    expect(screen.queryByTestId('electricity-form')).not.toBeInTheDocument()
  })

  it('should render estimate even with invalid state values', () => {
    mockLocation.mockReturnValue({ 
      state: { 
        values: { invalid: 'data' } 
      } 
    })

    render(
      <BrowserRouter>
        <Electricity />
      </BrowserRouter>
    )

    const estimate = screen.getByTestId('electricity-estimate')
    expect(estimate).toBeInTheDocument()
    expect(screen.getByText('{"invalid":"data"}')).toBeInTheDocument()
  })

  it('should apply correct styling and theme', () => {
    mockLocation.mockReturnValue({ state: null })

    const { container } = render(
      <BrowserRouter>
        <Electricity />
      </BrowserRouter>
    )

    const box = container.firstChild as HTMLElement
    expect(box).toHaveStyle({
      margin: 'auto',
      height: '89vh',
      alignContent: 'center',
      justifyContent: 'center',
      padding: '30px',
      backgroundColor: mockColors.primary[400]
    })
  })
}) 