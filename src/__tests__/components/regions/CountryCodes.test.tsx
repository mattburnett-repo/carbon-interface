import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CountryCodes, { useCountryCodes } from '../../../components/regions/CountryCodes'
import { FormikProps } from 'formik'
import { LocationOptionElement } from '../../../components/regions/types'

// Mock the listOfCountries
jest.mock('../../../components/regions/CountriesList', () => ({
  listOfCountries: {
    'US': { code: 'US', name: 'United States' },
    'CA': { code: 'CA', name: 'Canada' },
    'GB': { code: 'GB', name: 'United Kingdom' }
  }
}))

describe('CountryCodes', () => {
  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    }),
    initialValues: { country: '', state: '' }
  } as unknown as FormikProps<{ country: string; state: string }>

  it('renders country select with label', () => {
    render(<CountryCodes parentState={mockFormik} />)
    expect(screen.getByRole('button', { name: /country/i })).toBeInTheDocument()
  })

  it('renders country options in alphabetical order', async () => {
    render(<CountryCodes parentState={mockFormik} />)
    const select = screen.getByRole('button', { name: /country/i })
    await userEvent.click(select)
    
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('Canada')
    expect(options[1]).toHaveTextContent('United Kingdom')
    expect(options[2]).toHaveTextContent('United States')
  })

  it('handles country selection', async () => {
    render(<CountryCodes parentState={mockFormik} />)
    const select = screen.getByRole('button', { name: /country/i })
    await userEvent.click(select)
    await userEvent.click(screen.getByText('Canada'))
    
    expect(mockFormik.getFieldProps('country').onChange).toHaveBeenCalled()
  })
})

describe('useCountryCodes', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('returns sorted country codes', () => {
    const codes = useCountryCodes()
    expect(codes).toEqual([
      { code: 'CA', name: 'Canada' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'US', name: 'United States' }
    ])
  })

  it('handles empty country list', () => {
    jest.mock('../../../components/regions/CountriesList', () => ({
      listOfCountries: {}
    }))
    
    // Re-import with type
    const { useCountryCodes: getCountryCodes } = require('../../../components/regions/CountryCodes') as { useCountryCodes: () => LocationOptionElement[] }
    const codes = getCountryCodes()
    expect(codes).toEqual([])
  })
}) 