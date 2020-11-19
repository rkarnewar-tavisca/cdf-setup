const { jestConfig } = require('@orxe-devkit/angular-jest-config');

let updatedJestConfig = jestConfig();

updatedJestConfig.moduleNameMapper = {
  "^@app/(.+)$": "<rootDir>/src/app/$1",
  "^@core/(.+)$": "<rootDir>/src/app/core/$1",
  "^@shared/(.+)$": "<rootDir>/src/app/shared/$1",
  "^@env/(.+)$": "<rootDir>/src/environments/$1",
  "^@store/(.+)$": "<rootDir>/src/app/core/store/$1",
  "^@mocks/(.+)$": "<rootDir>/src/mocks/$1"
}

updatedJestConfig.coveragePathIgnorePatterns.push(
  '<rootDir>/src/components.ts',
  '<rootDir>/src/main.prod.ts',
  '<rootDir>/src/mocks',
);

module.exports = updatedJestConfig;