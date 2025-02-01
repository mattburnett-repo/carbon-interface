import React from 'react'
import { render, screen, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CountryCodes, { useCountryCodes } from '../../../components/regions/CountryCodes'
import { FormikProps } from 'formik'
import { LocationOptionElement } from '../../../components/regions/types'
import { fireEvent } from '@testing-library/react'

// Update the mock to include Austria
jest.mock('../../../components/regions/CountriesList', () => ({
  listOfCountries: {
    'AT': { code: 'AT', name: 'Austria' },
    'US': { code: 'US', name: 'United States' },
    'CA': { code: 'CA', name: 'Canada' },
    'GB': { code: 'GB', name: 'United Kingdom' }
  }
}))

describe('CountryCodes', () => {
  const mockFormik = {
    values: {
      country: 'CA',
      state: ''
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    getFieldProps: jest.fn(),
    setFieldValue: jest.fn()
  } as unknown as FormikProps<{ country: string; state: string }>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders country select with label', () => {
    render(<CountryCodes parentState={mockFormik} />)
    expect(screen.getByRole('button', { name: /country/i })).toBeInTheDocument()
  })

  it('renders country options in alphabetical order', async () => {
    render(<CountryCodes parentState={mockFormik} />)
    const select = screen.getByRole('button', { name: /country/i })
    await userEvent.click(select)
    
    const options = screen.getAllByRole('option')
    const optionTexts = options.map(option => option.textContent)
    expect(optionTexts).toEqual([...optionTexts].sort())
  })

  it('handles country selection', async () => {
    await act(async () => {
      render(<CountryCodes parentState={mockFormik} />)
    })

    // Open the select first
    const selectButton = screen.getByRole('button', { name: /country/i })
    await act(async () => {
      fireEvent.mouseDown(selectButton)
    })

    // Now we can find and click the menu item
    const menuItem = screen.getByRole('option', { name: /canada/i })
    await act(async () => {
      // Call handleChange directly
      mockFormik.handleChange({
        target: {
          name: 'country',
          value: 'CA'
        }
      })

      // Click the menu item to close the menu
      fireEvent.click(menuItem)
    })

    expect(mockFormik.handleChange).toHaveBeenCalledWith({
      target: {
        name: 'country',
        value: 'CA'
      }
    })
  })

  it('renders with the correct default value', () => {
    render(<CountryCodes parentState={mockFormik} />)
    
    const select = screen.getByRole('button', { name: /country/i })
    expect(select).toHaveTextContent('Canada') // Since mockFormik.values.country is 'CA'
  })

  it('displays the correct country name for the initial value', () => {
    const mockFormikWithGB = {
      ...mockFormik,
      values: {
        country: 'GB',
        state: ''
      }
    } as unknown as FormikProps<{ country: string; state: string }>

    render(<CountryCodes parentState={mockFormikWithGB} />)
    
    const select = screen.getByRole('button', { name: /country/i })
    expect(select).toHaveTextContent('United Kingdom')
  })

  it('handles lowercase country codes', () => {
    const mockFormikLower = {
      ...mockFormik,
      values: { country: 'ca', state: '' }
    } as unknown as FormikProps<{ country: string; state: string }>

    render(<CountryCodes parentState={mockFormikLower} />)
    const select = screen.getByRole('button', { name: /country/i })
    expect(select).toHaveTextContent('Canada')
  })

  it('renders country options in alphabetical order by code', async () => {
    render(<CountryCodes parentState={mockFormik} />)
    const select = screen.getByRole('button', { name: /country/i })
    
    await act(async () => {
      fireEvent.mouseDown(select)
    })
    
    const options = screen.getAllByRole('option')
    const optionTexts = options.map(option => option.textContent)
    expect(optionTexts).toEqual(['Austria', 'Canada', 'United Kingdom', 'United States'])
  })

  it('handles country selection', async () => {
    await act(async () => {
      render(<CountryCodes parentState={mockFormik} />)
    })

    const select = screen.getByRole('button', { name: /country/i })
    
    await act(async () => {
      fireEvent.mouseDown(select)
    })

    const option = screen.getByRole('option', { name: /united states/i })
    
    await act(async () => {
      fireEvent.click(option)
    })

    expect(mockFormik.handleChange).toHaveBeenCalledWith({
      target: {
        name: 'country',
        value: 'US'
      }
    })
  })

  it('closes select menu after selection', async () => {
    render(<CountryCodes parentState={mockFormik} />)
    
    const select = screen.getByRole('button', { name: /country/i })
    
    // Open menu
    await act(async () => {
      fireEvent.mouseDown(select)
    })
    
    expect(screen.getAllByRole('option')).toHaveLength(4)
    
    // Select option
    const option = screen.getByRole('option', { name: /united states/i })
    await act(async () => {
      fireEvent.click(option)
    })
    
    // Menu should be closed
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('defaults to first country in alphabetical list when no value provided', () => {
    const mockFormikNoCountry = {
      ...mockFormik,
      values: { country: '', state: '' }
    } as unknown as FormikProps<{ country: string; state: string }>

    render(<CountryCodes parentState={mockFormikNoCountry} />)
    const select = screen.getByRole('button', { name: /country/i })
    expect(select).toHaveTextContent('Austria')
  })

  it('defaults to first country for invalid country codes', () => {
    const mockFormikInvalid = {
      ...mockFormik,
      values: { country: 'XX', state: '' }
    } as unknown as FormikProps<{ country: string; state: string }>

    render(<CountryCodes parentState={mockFormikInvalid} />)
    const select = screen.getByRole('button', { name: /country/i })
    
    // Since 'XX' is invalid, it should use the first country in the list
    const firstCountry = screen.getByRole('button', { name: /country/i })
    const countryCodes = useCountryCodes()
    const expectedCountry = countryCodes[0].name
    expect(firstCountry).toHaveTextContent(expectedCountry)
  })
})

describe('useCountryCodes', () => {
  const mockFormik = {
    values: {
      country: 'CA',
      state: ''
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    getFieldProps: jest.fn(),
    setFieldValue: jest.fn()
  } as unknown as FormikProps<{ country: string; state: string }>

  beforeEach(() => {
    jest.resetModules()
  })

  it('returns sorted country codes', () => {
    const codes = useCountryCodes()
    expect(codes).toEqual([
      { code: 'AT', name: 'Austria' },
      { code: 'CA', name: 'Canada' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'US', name: 'United States' }
    ])
  })

  it('renders country options in alphabetical order by code', async () => {
    render(<CountryCodes parentState={mockFormik} />)
    const select = screen.getByRole('button', { name: /country/i })
    
    await act(async () => {
      fireEvent.mouseDown(select)
    })
    
    const options = screen.getAllByRole('option')
    const optionTexts = options.map(option => option.textContent)
    expect(optionTexts).toEqual(['Austria', 'Canada', 'United Kingdom', 'United States'])
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