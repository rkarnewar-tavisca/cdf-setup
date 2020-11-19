const { jestConfig } = require('@orxe-devkit/jest-config');

customConfig = {
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/components/**/src/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/components/**/src/**/*.d.ts',
    '<rootDir>/components/**/src/**/*css.ts',
    '!<rootDir>/components/**/src/_test_/*.{js,jsx,ts,tsx}',
    '!<rootDir>/components/**/src/flatpickr/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/components/**/src/mixin/keyboard/_test_/*.{js,jsx,ts,tsx}',
  ],
  testMatch: ['<rootDir>/components/**/src/**/*.{spec,test,axe}.{js,jsx,ts,tsx}'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './jest-html-report',
      },
    ],
  ],
};

module.exports = jestConfig(customConfig);
