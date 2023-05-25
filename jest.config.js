const ignoreDirs = ['dist/', 'node_modules/']

export default () => ({
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: false,
  silent: true,
  roots: ['./src'],
  transform: {
    '^.+\\.[t]sx?$': `ts-jest`
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ignoreDirs,
  coveragePathIgnorePatterns: ignoreDirs,
  coverageDirectory: '<rootDir>/coverage/',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([t]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
})
