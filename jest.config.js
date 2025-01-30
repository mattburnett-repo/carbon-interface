module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^scenes/(.*)$': '<rootDir>/src/scenes/$1',
    '^theme$': '<rootDir>/src/theme'
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { 
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@vitejs/plugin-react)/)'
  ],
  testMatch: [
    '<rootDir>/src/__tests__/**/*.{js,jsx,ts,tsx}'
  ]
}
