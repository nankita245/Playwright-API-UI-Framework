import {test, expect } from "../../fixtures/pages.fixture.js"
import { loginPageData } from "../../test-data/sauceDemo/loginPageTestData.js"

test.beforeEach('Navigate to URL', async ({loginPage})=>
{
    await loginPage.navigateToUrl()
})

test('@WebTest Login with valid Credentials', async({loginPage,productsPage})=>
{
    
    await loginPage.loginToApplication(loginPageData.validUser.userName,loginPageData.validUser.password)
    await productsPage.isOnInventoryPage()
})

test.describe('Invalid Login Scenarios', ()=>
{
loginPageData.invalidUsers.forEach((data)=>{
test(`@WebTest Login fails | user: "${data.userName}" | password: "${data.password}"`, async({loginPage,page})=>
{
    
    await loginPage.loginToApplication(data.userName,data.password)
    await expect(page.getByText(data.error)).toBeVisible()
}
)}
)
})

test('@WebTest Check Login fail of Locked out user', async({loginPage,page})=>
{

    
    await loginPage.loginToApplication(loginPageData.lockedOutUser.userName,loginPageData.lockedOutUser.password)
    const errorMessage = await page.getByText(loginPageData.lockedOutUser.error)
    await expect(errorMessage).toBeVisible()
}
)

test('@WebTest Check SQL Injection handling', async ({loginPage,page})=>
{
    
    await loginPage.loginToApplication(loginPageData.sqlInjectionUser.userName,loginPageData.sqlInjectionUser.password)
    const errorMessage = await page.getByText(loginPageData.sqlInjectionUser.error)
    await expect(errorMessage).toBeVisible()
}
)

test('@WebTest Verify session persistance on new Tab', async({loginPage,productsPage,context})=>
{
    
    await loginPage.loginToApplication(loginPageData.validUser.userName,loginPageData.validUser.password)
    await productsPage.isOnInventoryPage()
 
    const newPage = await context.newPage()
    await newPage.goto('/inventory.html')
    await expect(newPage).toHaveURL(/inventory/)
    

}
)

test('@WebTest Verify session persists after reload', async ({ loginPage, page, productsPage }) => {

  

  await loginPage.loginToApplication(
    loginPageData.validUser.userName,
    loginPageData.validUser.password
  );

  await productsPage.isOnInventoryPage();

  await page.reload();

  await productsPage.isOnInventoryPage();

});

