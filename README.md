# Playwright API + UI Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-blue)
![Allure](https://img.shields.io/badge/Reporting-Allure-orange)

A scalable and maintainable end-to-end test automation framework built using Playwright with JavaScript.

This framework supports:

* UI Automation
* API Automation
* Page Object Model (POM)
* Allure Reporting
* GitHub Actions CI/CD
* Dynamic Test Data Handling
* Reusable Utilities
* Authentication Setup
* Parallel Execution

---

# Tech Stack

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| Playwright        | UI & API Automation      |
| JavaScript        | Programming Language     |
| Node.js           | Runtime Environment      |
| Allure Report     | Advanced Reporting       |
| GitHub Actions    | CI/CD Integration        |
| Page Object Model | Framework Design Pattern |

---

# Framework Structure

```bash
Playwright-API-UI-Framework
│
├── .github/workflows
│   └── playwright.yml
│
├── assets
│   └── screenshots
│       ├── playwright-report.png
│       └── allure-report.png
│
├── config
│
├── fixtures
│   └── pages.fixture.js
│
├── pages
│   ├── loginPage.js
│   ├── productsPage.js
│   ├── customerInformationPage.js
│   ├── checkoutOverviewPage.js
│   └── yourCartPage.js
│
├── test-data
│   ├── sauceDemo
│   └── restfullBooker
│
├── tests
│   ├── UIAutomation
│   ├── APIAutomation
│   └── auth
│
├── utils
│   ├── randomDataGenerator.js
│   └── priceUtils.js
│
├── playwright.config.js
├── package.json
└── .gitignore
```

---

# Key Features

## UI Automation

* Login workflow validation
* Product page validations
* Checkout flow automation
* Cart functionality testing
* End-to-end purchase flow

## API Automation

* GET API Testing
* POST API Testing
* PUT API Testing
* PATCH API Testing
* Query Parameter Validation
* Static & Dynamic Request Body Validation

## Reporting

* Playwright HTML Reports
* Allure Reports
* Failure Screenshots
* Trace Collection
* Video Recording on Failures

## Framework Capabilities

* Reusable Page Objects
* Centralized Test Data Management
* Custom Utility Functions
* Authentication State Handling
* Scalable Folder Structure
* CI/CD Ready Framework

---

# Installation

## Clone Repository

```bash
git clone https://github.com/nankita245/Playwright-API-UI-Framework.git
```

## Navigate to Project

```bash
cd Playwright-API-UI-Framework
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

---

# Running Tests

## Run All Tests

```bash
npx playwright test
```

## Run UI Tests

```bash
npx playwright test tests/UIAutomation
```

## Run API Tests

```bash
npx playwright test tests/APIAutomation
```

## Run Specific Test File

```bash
npx playwright test tests/UIAutomation/login.spec.js
```

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

## Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
```

---

# Reporting

## Open Playwright HTML Report

```bash
npx playwright show-report
```

## Generate Allure Results

```bash
npx playwright test
```

## Open Allure Report

```bash
npx allure serve allure-results
```

---

# Reports Preview

## Playwright HTML Report

![Playwright Report](assets/screenshots/playwright-report.png)

## Allure Report

![Allure Report](assets/screenshots/allure-report.png)

---

# GitHub Actions CI/CD

This framework includes GitHub Actions integration for automated test execution.

### Features

* Automated workflow execution
* Parallel execution support
* CI-ready configuration
* Easy integration with pipelines

---

# Design Patterns Used

## Page Object Model (POM)

The framework follows the Page Object Model design pattern to improve:

* Reusability
* Maintainability
* Readability
* Scalability

## Fixture-Based Architecture

Reusable fixtures are implemented for:

* Common setup
* Page initialization
* Test optimization

---

# Utilities Included

| Utility                | Purpose            |
| ---------------------- | ------------------ |
| randomDataGenerator.js | Dynamic test data  |
| priceUtils.js          | Price calculations |

---

# Reporting Features

The framework captures:

* Screenshots on failure
* Videos on failure
* Execution traces
* Detailed step execution logs
* Allure visual reports

---

# Future Enhancements

Planned improvements:

* Docker Integration
* Jenkins Integration
* Cross-browser cloud execution
* Database validation support
* Environment-based configuration
* Performance testing integration

---

# Why This Framework?

This framework is designed with real-world automation practices used in enterprise-level projects.

### Focus Areas

* Maintainability
* Scalability
* Reusability
* Clean code architecture
* CI/CD readiness
* Professional reporting

---

# Author

Ankita Nagotia

Software Test Engineer | Playwright Automation | API Testing | UI Automation

---

# Connect

* GitHub: https://github.com/nankita245/Playwright-API-UI-Framework
* LinkedIn: https://www.linkedin.com/in/ankita-nagotia-3354a0227/

---

# License

This project is developed for learning, portfolio demonstration, and automation practice purposes.