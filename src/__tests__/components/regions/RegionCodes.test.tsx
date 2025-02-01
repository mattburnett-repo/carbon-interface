import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { FormikProps } from 'formik'
import RegionCodes, { useRegionCodes } from '../../../components/regions/RegionCodes'
import { LocationOptionElement } from '../../../components/regions/types'

// Mock the CountriesList module
jest.mock('../../../components/regions/CountriesList', () => ({
  listOfCountries: {
    'US': {
      code: 'US',
      name: 'United States',
      regions: [
        { iso: 'CA', name: 'California' },
        { iso: 'NY', name: 'New York' },
        { iso: 'TX', name: 'Texas' }
      ]
    },
    'CA': {
      code: 'CA',
      name: 'Canada',
      regions: [
        { iso: 'ON', name: 'Ontario' },
        { iso: 'BC', name: 'British Columbia' },
        { iso: 'QC', name: 'Quebec' }
      ]
    }
  } as Record<string, LocationOptionElement>,
  regionsEnabled: ['US', 'CA']
}))

describe('RegionCodes', () => {
  const mockFormik = {
    values: {
      country: 'US',
      state: 'CA'
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn()
  } as unknown as FormikProps<{ country: string; state: string }>

  const mockFormikCA = {
    values: {
      country: 'CA',
      state: 'BC'
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn()
  } as unknown as FormikProps<{ country: string; state: string }>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders state select with label', () => {
    render(<RegionCodes parentState={mockFormik} countryCode="US" />)
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
  })

  it('renders regions for US', async () => {
    render(<RegionCodes parentState={mockFormik} countryCode="US" />)
    const select = screen.getByRole('button', { name: /state/i })
    await act(async () => {
      fireEvent.mouseDown(select)
    })

    // Use getAllByRole to find menu items
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('California')
    expect(options[1]).toHaveTextContent('New York')
    expect(options[2]).toHaveTextContent('Texas')
  })

  it('renders regions for Canada', async () => {
    render(<RegionCodes parentState={mockFormikCA} countryCode="CA" />)
    const select = screen.getByRole('button', { name: /state/i })
    await act(async () => {
      fireEvent.mouseDown(select)
    })

    // Use getAllByRole to find menu items
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('British Columbia')
    expect(options[1]).toHaveTextContent('Ontario')
    expect(options[2]).toHaveTextContent('Quebec')
  })

  it('displays the correct selected state', () => {
    render(<RegionCodes parentState={mockFormik} countryCode="US" />)
    const select = screen.getByRole('button', { name: /state/i })
    expect(select).toHaveTextContent('California')
  })

  it('handles state selection', async () => {
    const mockOnChange = jest.fn()
    const mockFormikWithChange = {
      ...mockFormik,
      handleChange: mockOnChange
    }

    render(<RegionCodes parentState={mockFormikWithChange} countryCode="US" />)
    const select = screen.getByRole('button', { name: /state/i })
    await act(async () => {
      fireEvent.mouseDown(select)
    })

    const option = screen.getByText('New York')
    await act(async () => {
      fireEvent.click(option)
    })

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('returns empty array for country without regions', () => {
    const regions = useRegionCodes('FR')
    expect(regions).toEqual([])
  })

  it('sets first region as default when country changes', () => {
    const mockOnChange = jest.fn()
    const mockFormikWithoutState = {
      ...mockFormik,
      values: {
        country: 'US',
        state: ''
      },
      handleChange: mockOnChange
    } as unknown as FormikProps<{ country: string; state: string }>

    render(<RegionCodes parentState={mockFormikWithoutState} countryCode="US" />)
    
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'state',
        value: 'CA'  // California is first US state in mock data
      }
    })
  })

  it('updates state when country changes', () => {
    const mockOnChange = jest.fn()
    const mockFormikWithState = {
      ...mockFormik,
      values: {
        country: 'US',
        state: 'CA'
      },
      handleChange: mockOnChange
    } as unknown as FormikProps<{ country: string; state: string }>

    const { rerender } = render(
      <RegionCodes parentState={mockFormikWithState} countryCode="US" />
    )

    rerender(
      <RegionCodes 
        parentState={{
          ...mockFormikWithState,
          values: { country: 'CA', state: 'BC' }  // Use valid Canadian province
        }} 
        countryCode="CA" 
      />
    )

    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'state',
        value: 'BC'
      }
    })
  })

  it('handles empty regions gracefully', () => {
    const mockOnChange = jest.fn()
    const mockFormikWithState = {
      ...mockFormik,
      values: {
        country: 'FR',  // Country with no regions
        state: ''
      },
      handleChange: mockOnChange
    } as unknown as FormikProps<{ country: string; state: string }>

    render(<RegionCodes parentState={mockFormikWithState} countryCode="FR" />)

    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'state',
        value: ''
      }
    })
  })
})

describe('useRegionCodes', () => {
  it('returns sorted regions for US', () => {
    const regions = useRegionCodes('US')
    expect(regions).toEqual([
      { code: 'CA', name: 'California' },
      { code: 'NY', name: 'New York' },
      { code: 'TX', name: 'Texas' }
    ])
  })

  it('returns sorted regions for Canada', () => {
    const regions = useRegionCodes('CA')
    expect(regions).toEqual([
      { code: 'BC', name: 'British Columbia' },
      { code: 'ON', name: 'Ontario' },
      { code: 'QC', name: 'Quebec' }
    ])
  })

  it('returns empty array for country without regions', () => {
    const regions = useRegionCodes('FR')
    expect(regions).toEqual([])
  })
}) 