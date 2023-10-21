module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
        '^@intellectia/server/(.*)$': '<rootDir>/src/$1',
      },
};
