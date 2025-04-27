## Overview

This repository contains an automation task for Deel, completed in 2024. It uses Playwright for end-to-end testing of a salary insights form, allowing users to select a role and country to view corresponding salary data. The tests cover three role-country combinations.

## Prerequisites

- Node.js (LTS recommended)
- Playwright

## CI with GitHub Actions

The project is integrated with GitHub Actions for continuous testing on each push or pull request.

## Running Tests

Use the following command to run the tests:
```sh
npx playwright test --project=chromium
```
