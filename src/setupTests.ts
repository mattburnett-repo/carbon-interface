import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import 'jest-environment-jsdom'

// Mock window.matchMedia
window.matchMedia = function (_query: string): MediaQueryList {
  return {
    matches: false,
    media: '',
    onchange: null,
    addListener: function () {},
    removeListener: function () {},
    addEventListener: function () {},
    removeEventListener: function () {},
    dispatchEvent: function () { return true }
  }
}

// Mock environment variables
process.env.VITE_API_BASE_URL = 'http://test-api.com/api/v1'
process.env.VITE_API_ESTIMATES_URL = 'http://test-api.com/api/v1/estimates'
process.env.VITE_API_VEHICLE_MAKES_URL = 'http://test-api.com/api/v1/vehicle_makes'
process.env.VITE_API_KEY = 'test-api-key'

declare global {
  var importFn: jest.Mock
  interface ImportMetaEnv {
    readonly VITE_API_ESTIMATES_URL: string
    readonly VITE_API_KEY: string
    readonly VITE_API_VEHICLE_MAKES_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

global.importFn = jest.fn()
;(global as any)['import.meta'] = {
  env: {
    VITE_API_ESTIMATES_URL: 'http://test-api.com/api/v1/estimates',
    VITE_API_KEY: 'test-api-key'
  }
}

export {}
