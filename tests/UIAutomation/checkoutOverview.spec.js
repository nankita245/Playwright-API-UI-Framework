import {test, expect } from '../../fixtures/pages.fixture.js'
import {cartPageData} from "../../test-data/sauceDemo/cartPageTestData.js"
import {loginPageTestData} from "../../test-data/sauceDemo/loginPageTestData.js"
import { productsPageData } from "../../test-data/sauceDemo/productsPageTestData.js"
import { checkoutPageData } from "../../test-data/sauceDemo/checkoutPageTestData.js"
import { checkoutOverviewData } from '../../test-data/sauceDemo/checkoutOverviewTestData.js'


test.beforeEach('Navigate to checkout Overview',async({page,loginPage,productsPage,customerInformation,yourCartPage})=>
{
  await page.goto('/inventory.html')
  await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
  await productsPage.clickOnCart()
  await yourCartPage.clickOnCheckoutButton()
  await customerInformation.fillInformation(checkoutPageData.validData.Name,checkoutPageData.validData.lastName,checkoutPageData.validData.zipCode)
  await customerInformation.continueCheckout()

}
)

test('Verify number of products added to cart and on Overview Page are same', async({checkoutOverviewPage,productsPage})=>
{
  //products on overview page
  const productsOnOverviewPage = await checkoutOverviewPage.totalProductsOnCheckout()   

  //products on cart 
  const productsOnCart = await productsPage.countProductsOnCart()

  await expect(productsOnOverviewPage).toEqual(productsOnCart)
 
})

test('Verify Item Total equals to total sum of all products prices',async ({ checkoutOverviewPage }) =>
{
    // Calculate total of Prices of all products
    const productsPrices = await checkoutOverviewPage.getProductsPrices()
    const totalOfAllProducts = productsPrices.reduce((sum, price) => sum + price, 0)
    // console.log(totalOfAllProducts)

   //item total on overview page
   const itemTotaldisplayed = await checkoutOverviewPage.itemTotal()
   await expect(totalOfAllProducts).toEqual(itemTotaldisplayed)
})

test('Verify Total amount equals to Item Total and Tax amount',async({checkoutOverviewPage})=>
{

    const itemTotal = await checkoutOverviewPage.itemTotal()
    const taxAmount = await checkoutOverviewPage.taxAmount()
    const expectedTotal = itemTotal+taxAmount
    const actualTotal = await checkoutOverviewPage.totalAmountWithTax()
    await expect(expectedTotal).toEqual(actualTotal)

}
)

test('Finish Checkout', async({checkoutOverviewPage,page})=>
{

    await checkoutOverviewPage.clickOnFinish()
    await expect(page).toHaveURL(/checkout-complete/)
    const completionText = await page.getByText('Thank you for your order!')
    expect(completionText).toBeVisible()


})