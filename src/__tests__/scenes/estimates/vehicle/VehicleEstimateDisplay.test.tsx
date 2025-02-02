import React from 'react'
import { render, screen } from '@testing-library/react'
import VehicleEstimateDisplay from '../../../../scenes/estimates/vehicle/VehicleEstimateDisplay'

const mockEstimate = {
  data: {
    id: 'test-id',
    type: 'vehicle_model',
    attributes: {
      distance_unit: 'km',
      distance_value: 100,
      vehicle_make: 'Test Make',
      vehicle_year: 2023,
      vehicle_model: 'Test Model',
      estimated_at: '2024-01-01',
      carbon_g: 1000,
      carbon_lb: 2.2,
      carbon_kg: 1,
      carbon_mt: 0.001
    }
  }
}

describe('VehicleEstimateDisplay', () => {
  it('displays all estimate data', () => {
    render(<VehicleEstimateDisplay estimate={mockEstimate} />)

    // Check basic info
    expect(screen.getByText('Vehicle Estimate')).toBeInTheDocument()
    expect(screen.getByText(/Vehicle Make: Test Make/)).toBeInTheDocument()
    expect(screen.getByText(/Vehicle Model: Test Model/)).toBeInTheDocument()
    expect(screen.getByText(/Vehicle Year: 2023/)).toBeInTheDocument()

    // Check distance info
    expect(screen.getByText(/100/)).toBeInTheDocument()
    expect(screen.getByText(/km/)).toBeInTheDocument()

    // Check carbon values
    expect(screen.getByText(/Carbon \(grams\): 1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(lbs\): 2.2/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(kg\): 1/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(mt\): 0.001/)).toBeInTheDocument()
  })
}) 