import { renderHook, act } from '@testing-library/react'
import { useMode, tokens } from '../theme'

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
    
    // Check built-in MUI palette colors
    expect(result.current[0].palette.primary.main).toBeDefined()
    expect(result.current[0].palette.secondary.main).toBeDefined()
    
    // Check custom color tokens
    const customTokens = result.current[0].palette.mode === 'light' ? 
      tokens('light') : tokens('dark')
    
    expect(customTokens.grey[100]).toBeDefined()
    expect(customTokens.primary[100]).toBeDefined()
    expect(customTokens.greenAccent[100]).toBeDefined()
    expect(customTokens.redAccent[100]).toBeDefined()
    expect(customTokens.blueAccent[100]).toBeDefined()
  })
}) 