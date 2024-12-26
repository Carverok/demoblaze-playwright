# Demoblaze Playwright

Playwright automation project for https://www.demoblaze.com/

## System requirements

- Node.js 18+
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- MacOS 12 Monterey, MacOS 13 Ventura, or MacOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.

## Recommended Development Environment

We recommend using [Visual Studio Code](https://code.visualstudio.com/) to work with this project. Visual Studio Code provides excellent support for JavaScript and TypeScript development, including extensions that enhance the Playwright testing experience.

### Steps to Get Started with Visual Studio Code

**Clone the Project**
Open Visual Studio Code, and use the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) to select **Git: Clone**. Enter the repository URL to clone this project to your local machine.

### Testing execution

### Node JS and playwright

```sh
# To install project dependencies run:
npm install
```

```sh
# To execute all the tests run:
npm test
```

```sh
# To execute login tests run:
npm run test:login
```

```sh
# To execute purchase products test run:
npm run test:purchase
```

```sh
# To execute add and remove items to cart test run:
npm run test:cart
```

```sh
# To execute send conctact message test run:
npm run test:contact
```

```sh
# To execute about us test run:
npm run test:about
```

```sh
# To open last HTML report run:
npm run report
```

## Customizing the Report in Playwright

To customize the report and run tests across multiple browsers, you can configure the `projects` section in the `playwright.config.ts` file. This section allows you to enable tests for major browsers by uncommenting the relevant blocks.

### Steps to Customize the Report

1. Open `playwright.config.ts`.
2. Locate the `projects` section.
3. Uncomment the desired browsers to include them in the test runs.

For example, uncomment the following section to run tests on `chromium`, `firefox`, `webkit`, or mobile devices:

```typescript
/* Configure projects for major browsers */
projects: [
  // {
  //   name: 'chromium',
  //   use: { ...devices['Desktop Chrome'] },
  // },

  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },

  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },

  // /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  // /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  {
    name: 'Google Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
],
```
