import { renderHook, act } from '@testing-library/react'
import { useMode } from '../theme'

describe('useMode', () => {
  it('toggles between light and dark mode', () => {
    const { result } = renderHook(() => useMode())
    
    // Initial state should be light mode
    expect(result.current[0].palette.mode).toBe('light')
    
    // Toggle to dark mode
    act(() => {
      result.current[1].toggleColorMode()
    })
    expect(result.current[0].palette.mode).toBe('dark')
  })

  it('provides correct color tokens', () => {
    const { result } = renderHook(() => useMode())
    expect(result.current[0].palette.primary.main).toBeDefined()
    expect(result.current[0].palette.secondary.main).toBeDefined()
  })
}) 