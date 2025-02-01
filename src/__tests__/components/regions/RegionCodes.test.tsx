import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { FormikProps } from 'formik'
import RegionCodes, { useRegionCodes } from '../../../components/regions/RegionCodes'

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
  },
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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders state select with label', () => {
    render(<RegionCodes parentState={mockFormik} countryCode="US" />)
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
  })

  it('renders regions for US', async () => {
    render(<RegionCodes parentState={mockFormik} countryCode="US" />)
    const select = screen.getByRole('combobox')
    await act(async () => {
      fireEvent.mouseDown(select)
    })

    expect(screen.getByText('California')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('Texas')).toBeInTheDocument()
  })

  it('renders regions for Canada', async () => {
    render(<RegionCodes parentState={mockFormik} countryCode="CA" />)
    const select = screen.getByRole('combobox')
    await act(async () => {
      fireEvent.mouseDown(select)
    })

    expect(screen.getByText('Ontario')).toBeInTheDocument()
    expect(screen.getByText('British Columbia')).toBeInTheDocument()
    expect(screen.getByText('Quebec')).toBeInTheDocument()
  })

  it('displays the correct selected state', () => {
    render(<RegionCodes parentState={mockFormik} countryCode="US" />)
    expect(screen.getByRole('combobox')).toHaveValue('CA')
  })

  it('handles state selection', async () => {
    const mockOnChange = jest.fn()
    const mockFormikWithChange = {
      ...mockFormik,
      handleChange: mockOnChange
    }

    render(<RegionCodes parentState={mockFormikWithChange} countryCode="US" />)
    const select = screen.getByRole('combobox')
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

    // Change country to Canada
    rerender(
      <RegionCodes parentState={mockFormikWithState} countryCode="CA" />
    )

    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'state',
        value: 'ON'  // Ontario is first Canadian province in mock data
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