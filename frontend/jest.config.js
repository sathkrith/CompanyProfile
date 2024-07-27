module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    moduleNameMapper: {
        '^react-leaflet$': '<rootDir>/__mocks__/react-leaflet.js',
        '^axios$': '<rootDir>/__mocks__/axios.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/css.js',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      },
  };
  