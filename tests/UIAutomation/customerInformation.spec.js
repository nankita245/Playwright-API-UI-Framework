import {test,expect} from "../../fixtures/pages.fixture.js"
import { cartPageData } from "../../test-data/sauceDemo/cartPageTestData.js"
import { loginPageData } from "../../test-data/sauceDemo/loginPageTestData.js"
import { productsPageData } from "../../test-data/sauceDemo/productsPageTestData.js"
import { checkoutPageData } from "../../test-data/sauceDemo/checkoutPageTestData.js"

test.beforeEach('Add Product to Cart',async ({loginPage,productsPage,page,yourCartPage})=>
{
  await page.goto('/inventory.html')
  await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
  await productsPage.clickOnCart()
  await yourCartPage.clickOnCheckoutButton()
})

test.describe('Checkout Validation Errors',()=>
{

    test('@WebTest Check Error on empty name',async ({ customerInformation,page})=>
    {
     
      await  customerInformation.fillInformation(checkoutPageData.emptyName.Name,checkoutPageData.emptyName.lastName,checkoutPageData.emptyName.zipCode)
      await  customerInformation.continueCheckout()  
      await expect(page.getByText(checkoutPageData.emptyName.error)).toBeVisible()
    })

    test('@WebTest Check Error on Empty Last Name',async({ customerInformation,page})=>
    {
      await  customerInformation.fillInformation(checkoutPageData.emptyLastname.Name,checkoutPageData.emptyLastname.lastName,checkoutPageData.emptyLastname.zipCode)
      await  customerInformation.continueCheckout()  
      await expect(page.getByText(checkoutPageData.emptyLastname.error)).toBeVisible()
    }
    )
    test('@WebTest Check Error on Empty Zip Code',async({ customerInformation,page})=>
    {
   
      await  customerInformation.fillInformation(checkoutPageData.emptyZipCode.Name,checkoutPageData.emptyZipCode.lastName,checkoutPageData.emptyZipCode.zipCode)
      await  customerInformation.continueCheckout()  
      await expect(page.getByText(checkoutPageData.emptyZipCode.error)).toBeVisible()
    }
    )
    
    test('@WebTest Test functionality of Cancel Checkout button', async({customerInformation,page})=>
    {
     
      await  customerInformation.fillInformation(checkoutPageData.validData.Name,checkoutPageData.validData.lastName,checkoutPageData.validData.zipCode)
      await  customerInformation.cancelCheckout()
      await expect(page).toHaveURL(/cart/)
    }
    )
    
    test('@WebTest Test functionality of Continue button on Customer Information page',async({customerInformation,page})=>
    {
      
      await  customerInformation.fillInformation(checkoutPageData.validData.Name,checkoutPageData.validData.lastName,checkoutPageData.validData.zipCode)
      await customerInformation.continueCheckout()
      await expect(page).toHaveURL(/checkout-step-two/)
    }
  
  )


})





//Complete Checkout Flow
//Checkout Validation Errors, Leave fields empty , Click Continue, Validate error message
//Cancel Checkout, Start checkout, Click Cancel, Validate return to inventory