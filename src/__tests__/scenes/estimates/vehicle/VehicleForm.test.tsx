import React from 'react'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate, BrowserRouter } from 'react-router-dom'
import VehicleForm from '../../../../scenes/estimates/vehicle/VehicleForm'
import { renderWithMui } from '../../../../test-utils/mui-test-utils'
import { QueryClient, QueryClientProvider } from 'react-query'

// Silence MUI warnings
const consoleWarn = console.warn
beforeAll(() => {
  console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('MUI:')) return
    consoleWarn(...args)
  }
})

afterAll(() => {
  console.warn = consoleWarn
})

// Mock API with immediate responses
jest.mock('../../../../services/vehicleApi', () => ({
  fetchVehicleMakes: jest.fn().mockResolvedValue([]),
  fetchVehicleModels: jest.fn().mockResolvedValue([])
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

describe('VehicleForm', () => {
  const mockNavigate = jest.fn()
  const user = userEvent.setup({ delay: null }) // Remove artificial delays
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { 
        retry: false,
        cacheTime: 0
      }
    }
  })

  beforeEach(() => {
    queryClient.clear()
    jest.clearAllMocks()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })

  const renderComponent = async () => {
    await act(async () => {
      renderWithMui(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <VehicleForm />
          </BrowserRouter>
        </QueryClientProvider>
      )
    })
  }

  it('renders form elements', async () => {
    await renderComponent()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get estimate/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/make/i)).toBeInTheDocument()
  })

  it('allows distance input', async () => {
    await renderComponent()
    const input = screen.getByRole('spinbutton')
    await user.type(input, '100')
    expect(input).toHaveValue(100)
  })
}) 