module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
        '^@intellectia/utils/(.*)$': '<rootDir>/src/$1',
      },
};
