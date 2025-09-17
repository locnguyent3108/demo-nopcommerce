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
3. Optional: Configure environment variables (for email-related tests using Mailosaur):
   - Create a `.env` file in the project root with:
     - `MAILOSAUR_API_KEY=your_api_key`
     - `MAILOSAUR_SERVER_ID=your_server_id`
   - On Windows PowerShell (one session):
     - `$env:MAILOSAUR_API_KEY="your_api_key"`
     - `$env:MAILOSAUR_SERVER_ID="your_server_id"`

## Test execution

### Quick start
- Run all tests (default environment: `local`):
  - `npm test`

### Environment-specific tests
- Run tests with dev environment:
  - `npm run test-dev`
- Run tests with local environment:
  - `npm run test-local`
- Run tests with staging environment:
  - `npm run test-staging`

### Advanced test options
- Run in headed mode:
  - `npx playwright test --headed`

- Run in UI mode (explore and debug):
  - `npx playwright test --ui`

- Run a specific file:
  - `npx playwright test tests/regression_test/RegisterTest.spec.ts`

- Run tests by title/grep:
  - `npx playwright test -g "register success"`

- Increase workers locally (override config):
  - `npx playwright test --workers=4`

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
  - `npm run test-staging` - runs with staging environment

- Manual environment variable (alternative):
  - Windows PowerShell: `$env:ENV="dev"; npm test`
  - macOS/Linux: `ENV=dev npm test`

The configuration automatically loads the appropriate environment settings and displays the selected environment in the console output.
