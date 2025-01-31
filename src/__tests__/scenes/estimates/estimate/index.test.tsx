import React from 'react'
import { render, screen } from '@testing-library/react'
import { tokens } from '../../../../theme'
import Estimate from '../../../../scenes/estimates/estimate'
import { QueryClient, QueryClientProvider } from 'react-query'

// Mock child component
jest.mock('../../../../scenes/estimates/estimate/Estimates', () => ({
  __esModule: true,
  default: () => <div data-testid="estimates">Estimates Component</div>
}))

// Mock theme
const mockUseTheme = jest.fn()
mockUseTheme.mockReturnValue({ palette: { mode: 'light' } })
const mockColors = tokens('light')

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => mockUseTheme()
}))

describe('Estimate', () => {
  const queryClient = new QueryClient()

  it('should render estimates component with correct styling', () => {
    const { container } = render(<Estimate />)

    expect(screen.getByTestId('estimates')).toBeInTheDocument()
    
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

  it('should render within query client context', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Estimate />
      </QueryClientProvider>
    )
    expect(screen.getByTestId('estimates')).toBeInTheDocument()
  })

  it('should maintain layout with different theme modes', () => {
    // Test dark mode
    mockUseTheme.mockReturnValueOnce({ palette: { mode: 'dark' } })
    
    const { container, rerender } = render(<Estimate />)
    expect(container.firstChild).toHaveStyle({
      backgroundColor: tokens('dark').primary[400]
    })

    // Test light mode
    mockUseTheme.mockReturnValueOnce({ palette: { mode: 'light' } })
    
    rerender(<Estimate />)
    expect(container.firstChild).toHaveStyle({
      backgroundColor: tokens('light').primary[400]
    })
  })
}) 