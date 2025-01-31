import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegionCodes, { useRegionCodes } from '../../../components/regions/RegionCodes'
import { FormikProps } from 'formik'

// Mock the listOfCountries with proper structure
jest.mock('../../../components/regions/CountriesList', () => ({
  listOfCountries: {
    'US': {
      name: 'United States',
      regions: [
        { iso: 'CA', name: 'California' },
        { iso: 'NY', name: 'New York' }
      ]
    },
    'INVALID': {
      name: 'Invalid Country',
      regions: []
    }
  }
}))

describe('RegionCodes', () => {
  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    }),
    initialValues: { state: '' }
  } as unknown as FormikProps<{ state: string }>
  it('renders state select', () => {
    const mockFormikWithCountry = {
      ...mockFormik,
      initialValues: { state: '', country: 'US' }
    } as unknown as FormikProps<{ state: string, country: string }>
    
    render(<RegionCodes parentState={mockFormikWithCountry} countryCode="US" />)
    const select = screen.getByRole('button', { 
      name: /state/i
    })
    expect(select).toBeInTheDocument()
  })

  it('renders region options for selected country', async () => {
    const mockFormikWithCountry = {
      ...mockFormik,
      initialValues: { state: '', country: 'US' }
    } as unknown as FormikProps<{ state: string, country: string }>

    render(<RegionCodes parentState={mockFormikWithCountry} countryCode="US" />)
    const select = screen.getByRole('button', { name: /state/i })
    await userEvent.click(select)
    
    expect(screen.getByText('California')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
  })
  it('shows none option', async () => {
    const mockFormikWithCountry = {
      ...mockFormik,
      initialValues: { state: '', country: 'US' }
    } as unknown as FormikProps<{ state: string, country: string }>

    render(<RegionCodes parentState={mockFormikWithCountry} countryCode="US" />)
    const select = screen.getByRole('button', { name: /state/i })
    await userEvent.click(select)
    
    expect(screen.getByRole('option', { name: '-- None --' })).toBeInTheDocument()
  })
})

describe('useRegionCodes', () => {
  it('returns empty array for invalid country code', () => {
    const regions = useRegionCodes('INVALID')
    expect(regions).toEqual([])
  })

  it('returns sorted regions for valid country code', () => {
    const regions = useRegionCodes('US')
    expect(regions).toEqual([
      { code: 'CA', name: 'California' },
      { code: 'NY', name: 'New York' }
    ])
  })
}) 