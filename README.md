![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red)
![Allure](https://img.shields.io/badge/Allure-Reporting-orange)
![Chromium](https://img.shields.io/badge/Chromium-Supported-brightgreen)
![WebKit](https://img.shields.io/badge/WebKit-Supported-blue)

# 🚀 Playwright API + UI Automation Framework

A production-grade, scalable test automation framework built with **Playwright** and **JavaScript** — covering end-to-end UI flows, REST API validation, and CI/CD pipeline integration with rich reporting.

---
 
## 📌 What Is This Framework Testing?
 
This framework automates the **Sauce Demo e-commerce application** and **Restful Booker API** for API validation. It covers key end-to-end user workflows such as authentication, product browsing, cart management, and checkout, along with API operations including booking creation, retrieval, update, and deletion. The framework demonstrates production-ready automation practices, reusable design patterns, and scalable architecture that can be applied across modern web and API testing projects. 
 
**Automated Coverage:**
- 🔐 Authentication flows (valid/invalid login, session reuse)
- 🛒 Product listing, sorting, and selection
- 🛍️ Cart operations (add, remove, verify items)
- 💳 Full checkout workflow (customer info → order summary → confirmation)
- 🌐 REST API validation (GET / POST / PUT / PATCH endpoints)
- 🔄 End-to-end API workflow chaining
> **Test Suite Size:** 30+ automated test cases across UI and API layers
 
---

## 📌 Key Features
 
### ✅ UI Automation
- End-to-End Testing with real user flow simulation
- Cross-Browser Testing (Chromium + Safari/WebKit)
- Parallel Execution for faster feedback
- Authentication State Reuse via stored session files
- Page Object Model (POM) for clean, maintainable locators

### ✅ API Automation
- Full CRUD coverage: GET, POST, PUT, PATCH
- Request schema validation
- Response assertion (status codes, body, headers)
- Multi-step API workflow testing

### ✅ Reporting & Debugging
- Playwright HTML Reports with step-level detail
- Allure Reports with trend history and failure analysis
- Automatic screenshots on failure
- Trace Collection for root-cause debugging
- Video recording on test failure

### ✅ CI/CD
- GitHub Actions (on push / pull request triggers)
- Jenkins pipeline with scheduled + parameterized builds
- Automated regression execution and build monitoring

---
 
## 🛠 Tech Stack
 
| Technology     | Version  | Purpose                      |
| -------------- | -------- | -----------------------------|
| Playwright     | Latest   | UI & API Test Automation     |
| JavaScript     | ES2022+  | Framework Language           |
| Node.js        | 18+      | Runtime Environment          |
| GitHub Actions | Latest   | Cloud CI/CD                  |
| Jenkins        | LTS      | On-Premise CI/CD             |
| Allure         | 2.x      | Advanced HTML Reporting      |
 
---
## 📂 Framework Structure
 
```
Playwright-API-UI-Framework
│
├── .github/workflows
│   └── playwright.yml              # GitHub Actions CI pipeline
│
├── assets/screenshots              # Report and execution screenshots
│
├── fixtures
│   └── pages.fixture.js            # Custom fixture combining all page objects
│
├── pages                           # Page Object Model layer
│   ├── loginPage.js
│   ├── productsPage.js
│   ├── customerInformationPage.js
│   ├── checkoutOverviewPage.js
│   └── yourCartPage.js
│
├── test-data                       # Centralized test data (JSON/env files)
│
├── tests
│   ├── UIAutomation                # UI end-to-end test suites
│   ├── APIAutomation               # API validation test suites
│   └── auth                       # Login state setup (runs once, reused by all)
│
├── utils
│   ├── randomDataGenerator.js      # Dynamic test data generation
│   └── priceUtils.js               # Price calculation helpers
│
├── playwright.config.js            # Unified Playwright config (browsers, parallelism reporter)
├── package.json
└── README.md
```
 
---
## 🏗 Framework Design
 
### Page Object Model (POM)
 
Each page is encapsulated in its own class with locators and action methods — keeping tests free of raw selectors and reducing maintenance cost when the UI changes.
 
```javascript
// pages/loginPage.js
export class LoginPage{

    constructor(page){
        this.page = page
        this.userName = page.getByPlaceholder('Username')
        this.password = page.getByPlaceholder('Password')
        this.submitLoginButton = page.getByRole('button',{name:'Login'})

    }

    async navigateToUrl()
    {
        await this.page.goto('/')
    }

    async loginToApplication(username,password)
    {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.submitLoginButton.click()
    }

    async navigateToInventoryPage() {
   await this.page.goto('/inventory.html')}
}
```
---
 
### Fixture-Based Setup
 
Custom fixtures wire all page objects together, injecting them into any test that needs them. Tests stay declarative and clean.
 
```javascript
// fixtures/pages.fixture.js
import { LoginPage } from "../pages/loginPage"
import { ProductsPage } from "../pages/productsPage"
import {test as base, expect} from "@playwright/test"

export const test = 
base.extend({ 
    
    loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
     await use(loginPage)
     },
    
    productsPage: async({page}, use) =>{
        const productsPage = new ProductsPage(page)
        await use(productsPage)
    }
    } 
)
    export { expect }

```
 
---
 
### Authentication State Reuse
 
Login runs **once** during setup and the session cookie is saved to disk. All subsequent tests load the saved state instead of re-authenticating — reducing execution overhead by ~20% on large suites.
 
```javascript
// tests/auth/auth.setup.js
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: 'playwright/.auth/user.json'
  });
});
```
 
---
 
### API Test Example
 
API tests are written using Playwright's built-in `request` context — no extra HTTP library needed.
 
```javascript
// tests/APIAutomation/users.spec.js
import {test,expect} from '@playwright/test'
import { generateBookingData } from '../../utils/randomDataGenerator.js'

test('@APItest Test Post api request using Dynamic request body',async ({page,request})=>

{
    const bookingData = generateBookingData()

    const postApiResponse = await request.post('https://restful-booker.herokuapp.com/booking',

     { data: bookingData}
    )

    const postAPIResponseBody = await postApiResponse.json()
    console.log(postAPIResponseBody)

  // validate status code
     await expect(postApiResponse.ok()).toBeTruthy()
     await expect(postApiResponse.status()).toBe(200)

   //validate json API response
     await expect(postAPIResponseBody.booking).toHaveProperty("firstname" , bookingData.firstname)
     await expect(postAPIResponseBody.booking).toHaveProperty("lastname" , bookingData.lastname)

    // validate nested json object
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkin" , bookingData.bookingdates.checkin) 
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout" , bookingData.bookingdates.checkout) 
    
}
)

```
 
---
 
### Utility Layer
 
Reusable helpers keep test logic clean and avoid magic values scattered across files.
 
```javascript
// utils/randomDataGenerator.js
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export function generateBookingData() {
    const checkin = DateTime.now().toFormat('yyyy-MM-dd');
    const checkout = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd');
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        bookingdates: {
      checkin,
      checkout
    }
    }
}
```
```javascript
// utils/priceUtils.js
export function convertPriceTextToNumber(priceText) {

    return Number(
        parseFloat(priceText.replace('$', '')).toFixed(2)
    );
}

export function calculateTotalPrice(prices) {

    return Number(
        prices.reduce((total, price) => total + price, 0).toFixed(2)
    );
}

export function calculateFinalPrice(itemTotal, tax) {

    return Number(
        (itemTotal + tax).toFixed(2)
    );
}
```
 
---
 
## ⚙️ Prerequisites & Setup
 
### Requirements
 
- **Node.js** v18 or higher
- **npm** v8 or higher

# 📈 Framework Statistics

| Metric | Details |
|----------|----------|
| Test Types | UI + API Automation |
| Architecture | Page Object Model + Fixtures |
| CI/CD | Jenkins |
| Reporting | Playwright HTML + Allure |
| Execution Strategy | Parallel Test Execution |
| Browser Coverage | Chromium, WebKit |
| Authentication | State Reuse |
| Debugging | Traces, Screenshots, Videos |


# ⚡ Test Execution Commands

## Install Dependencies

```bash
npm install
```

## Run Full Regression Suite

```bash
npm run regression
```

## Run UI Tests

```bash
npm run webTest
```

## Run API Tests

```bash
npm run apiTest
```

## Run Chromium Tests

```bash
npm run chromiumTest
```

## Run Safari / WebKit Tests

```bash
npm run safariTest
```

## Generate Allure Report

```bash
npm run allureGenerate
```

## Open Allure Report

```bash
npm run allureOpen
```
---
 
## 🧪 Test Execution
 
Playwright executes tests in parallel across workers to maximise speed. A typical full regression run completes in under **2 minutes**.
 
![Playwright Test Execution](assets/screenshots/test-execution.png)
 
---

## CI/CD Pipeline

### Jenkins Build Success

![Jenkins Build](./assets/screenshots/jenkins-success.png)

Jenkins pipeline is configured to:

- Pull latest code from GitHub
- Install project dependencies
- Execute Playwright test suites
- Generate Allure reports
- Publish execution results
- Provide fast feedback to the team

### Jenkins Test Execution

![Jenkins Test Execution](assets/screenshots/test-execution-jenkins.png)

Parameterized Jenkins jobs allow selective execution of:

- Full Regression Suite
- UI Automation Tests
- API Automation Tests
- Browser-specific executions

Supported execution commands:

### Supported Jenkins Execution Commands

| Script | Description | Scope |
|---------|-------------|--------|
| `npm run regression` | Executes complete regression suite | UI + API |
| `npm run webTest` | Executes UI automation tests | UI |
| `npm run apiTest` | Executes API automation tests | API |
| `npm run chromiumTest` | Executes tests on Chromium browser | Chromium |
| `npm run safariTest` | Executes tests on WebKit/Safari browser | WebKit |
| `npm run allureGenerate` | Generates Allure report | Reporting |
| `npm run allureOpen` | Opens Allure report | Reporting |


---

# 📊 Reporting

## Playwright HTML Report

Provides detailed execution insights, passed/failed test information, execution duration, and debugging support.

![Playwright HTML Report](assets/screenshots/playwright-report.png)

---

## Allure Report

Provides advanced reporting with trends, execution history, detailed failure analysis, screenshots, and traces.

![Allure Report](assets/screenshots/allure-report.png)

---
 
## 🎯 Design Decisions & Why They Matter
 
| Decision | Reason |
|---|---|
| **POM Architecture** | Isolates locators from test logic — one change in the UI = one file to update |
| **Fixture injection** | Keeps test files focused on assertions, not setup boilerplate |
| **Auth state reuse** | Eliminates repeated login steps; speeds up large suites by ~20% |
| **Parallel execution** | Playwright workers cut total run time significantly vs sequential |
| **Dual CI/CD** | GitHub Actions for cloud PR validation; Jenkins for on-premise scheduled regression |
| **Allure + HTML reports** | HTML for quick dev feedback; Allure for trend tracking and post-sprint analysis |
 
---
## 🔍 Problems This Framework Solves
 
| Problem | Solution |
|---|---|
| Repetitive login in every test | Auth state saved once, reused everywhere |
| Fragile selectors scattered in tests | All locators centralized in Page Objects |
| Slow sequential test execution | Parallel workers via Playwright config |
| Debugging failures without context | Screenshots + traces + video captured automatically |
| No CI visibility | GitHub Actions + Jenkins integration with report artifacts |
| Inconsistent test data | Faker-powered dynamic data generators |
 
---

# 🎯 Framework Highlights

* UI + API Automation
* Page Object Model Architecture
* Fixture-Based Design
* Authentication State Reuse
* Parallel Execution
* Chromium Browser Support
* Safari/WebKit Browser Support
* Jenkins Integration
* Allure Reporting
* Playwright HTML Reporting
* Screenshot Capture
* Trace Collection
* Scalable Folder Structure

---

# 🔗 Repository

https://github.com/nankita245/Playwright-API-UI-Framework

---

⭐ If you find this framework useful, consider starring the repository.
