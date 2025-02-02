import React from 'react'
import { render, act } from '@testing-library/react'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material'
import { Screen } from '@testing-library/react'

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        elevation: 0,
        style: { transition: 'none' }
      }
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          transitionDuration: 0,
          style: { transition: 'none' }
        }
      }
    }
  }
})

export function renderWithMui(ui: React.ReactElement) {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

// Helper for MUI select testing
export async function openSelect(screen: Screen, name: RegExp | string) {
  const select = screen.getByRole('button', { name })
  select.click()
  // Wait for the popup to be in the document
  return screen.findByRole('listbox')
}

// Helper for handling async form updates
export async function fillFormFields(callback: () => Promise<void>) {
  // Wrap in act to handle all state updates
  await act(async () => {
    await callback()
  })
} 