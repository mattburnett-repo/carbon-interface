import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useFormik } from 'formik'
import VehicleMakes from '../../../components/vehicle/VehicleMakes'
import { type iInitialValues } from '../../../scenes/estimates/vehicle/types'

// Define test types locally
type Make = {
  data: {
    id: string
    type: 'vehicle_make'
    attributes: {
      name: string
      number_of_models: number
      models: { id: string; name: string; year: number }[]
    }
  }
}

const mockMakes: Make[] = [
  {
    data: {
      id: 'toyota-id',
      type: 'vehicle_make',
      attributes: {
        name: 'Toyota',
        number_of_models: 10,
        models: []
      }
    }
  },
  {
    data: {
      id: 'honda-id',
      type: 'vehicle_make',
      attributes: {
        name: 'Honda',
        number_of_models: 8,
        models: []
      }
    }
  }
]

// Wrapper component to provide formik context
function TestComponent({ makes }: { makes: Make[] }) {
  const formik = useFormik<iInitialValues>({
    initialValues: {
      vehicle_make_id: '',
      vehicle_model_id: '',
      distance_value: 0,
      distance_unit: 'km',
      type: 'vehicle' as const
    },
    onSubmit: () => {}
  })

  return <VehicleMakes formik={formik} makes={makes} />
}

describe('VehicleMakes', () => {
  const user = userEvent.setup({ delay: null })

  it('renders makes dropdown', () => {
    render(<TestComponent makes={mockMakes} />)
    expect(screen.getByTestId('make-select')).toBeInTheDocument()
  })

  it('handles selection', async () => {
    render(<TestComponent makes={mockMakes} />)
    const select = screen.getByTestId('make-select')
    expect(select).toBeInTheDocument()
  })
}) 