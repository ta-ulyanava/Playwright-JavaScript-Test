# Salary Insights Playwright Tests

## Overview

This project provides automated E2E tests for the **Salary Insights** form using **Playwright**.  
Users select a role and a country to view salary estimates. Tests cover positive flows (valid selections) and negative cases (missing country selection).,

## 📊 Test Reports

- [▶️ Playwright native Report](https://ta-ulyanava.github.io/Playwright-JavaScript-Test/playwright-report/)
- [💎 Allure Report](https://ta-ulyanava.github.io/Playwright-JavaScript-Test/allure-report/)


## Project Structure

- `pages/` — Page Object Models (BasePage, SalaryInsightsPage)
- `tests/` — Test scenarios
- `data/` — Static test data (role, country, currency)
- `baseTest.js` — Shared fixtures for setup

## Prerequisites

- Node.js (LTS version recommended)
- Install project dependencies:
  ```bash
  npm install
  ```


## Continuous Integration

Tests are configured to run automatically via **GitHub Actions** on each push and pull request.

## TODO (Next Steps)

- Refactor `SalaryInsightsPage`:
  - Move form actions into a `SalaryInsightsForm` component.
  - Move result validations into a `SalaryInsightsResult` component.
- Consider moving utility methods (e.g., `clickByText`, `getCleanedText`) into a separate shared utils file.
- Add more negative test cases (e.g., empty role, invalid inputs).

## Running Tests

Use the following command to run the tests:
```sh
npx playwright test --project=chromium
```

