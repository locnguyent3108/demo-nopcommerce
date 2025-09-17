### Demo nopCommerce E2E tests (Playwright + TypeScript)

## Prerequisites
- **Node.js**: v18+ recommended (verify with `node -v`)
- **npm**: v9+ (verify with `npm -v`)

## Setup
1. Install dependencies:
   - `npm i`
2. Install Playwright browsers:
   - `npx playwright install`
   - (Linux/macOS only, if needed): `npx playwright install-deps`

## Test execution

### Quick start
- Run all tests in local machine:
  - `npm run test-local`

### Environment-specific tests
- Run tests with dev environment:
  - `npm run test-dev`
- Run tests with staging environment:
  - `npm run test-staging`

### Advanced test options
- Run in  UI mode:
  - `npm run test-ui`

- Run in head mode (explore and debug):
  - `npx playwright test --headed`

- Open the latest HTML report:
  - `npx playwright show-report`

## Environment configuration
The project supports multiple environments with different base URLs:
- **local**: `https://demo.nopcommerce.com` (default)
- **dev**: `https://demo.nopcommerce.com`
- **staging**: `https://demo.nopcommerce.com`

### Environment selection
- Use npm scripts (recommended):
  - `npm run test-dev` - runs with dev environment
  - `npm run test-local` - runs with local environment  
  - `npm run test-prod` - runs with staging environment

- Manual environment variable (alternative):
  - Windows PowerShell: `$env:ENV="dev"; npm test`
  - macOS/Linux: `ENV=dev npm test`

The configuration automatically loads the appropriate environment settings and displays the selected environment in the console output.
