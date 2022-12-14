module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
  testRegex: '(/src//__tests__//unit/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  roots: [
    '<rootDir>/src',
  ],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  verbose: true,
}
