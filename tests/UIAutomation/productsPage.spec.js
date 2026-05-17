import {test, expect } from "../../fixtures/pages.fixture.js"
import { productsPageData } from "../../test-data/sauceDemo/productsPageTestData.js"
import {loginPageData} from "../../test-data/sauceDemo/loginPageTestData.js"
import {cartPageData} from "../../test-data/sauceDemo/cartPageTestData.js"


test.beforeEach('Login To Application',async ({page})=>
{
     await page.goto('/inventory.html')
}
)

test.describe('Sorting Tests: ', ()=>
{
    test('Sorting Products from A to Z', async ({productsPage})=>

{
   const names = await productsPage.getAllProductsNames()
  // console.log(names)
   await productsPage.selectSortOption(productsPageData.sortAtoZ.optionValue)   
   const sortedNames = [...names].sort((a, b) => a.localeCompare(b))
  // console.log(sortedNames)
   expect(names).toEqual(sortedNames);

}
)

test('Sorting Products from Z to A', async({productsPage})=>
{
    await productsPage.selectSortOption(productsPageData.sortZtoA.optionValue)
    await productsPage.page.waitForLoadState('networkidle');
    const names = (await productsPage.getAllProductsNames())
    .map(n => n.trim()); 
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a))

  //  console.log(names)
   // console.log(sortedNames)
   expect(names).toEqual(sortedNames);  
})

test('Sorting Products from Price High to Low', async({productsPage})=>
{
    await productsPage.selectSortOption(productsPageData.sortHighToLow.optionValue)
   // await productsPage.page.waitForLoadState('networkidle');
    const productsPrices = await productsPage.getAllProductsPrices() 
    const sortedPrice = [...productsPrices].sort((a, b) => b - a)
  //  console.log(productsPrices)
  //  console.log(sortedPrice)
    expect(productsPrices).toEqual(sortedPrice); 

}

)

test('Sorting Products from Price Low to High', async({productsPage})=>
{
    await productsPage.selectSortOption(productsPageData.sortLowToHigh.optionValue)
   // await productsPage.page.waitForLoadState('networkidle')
    const productsPrices = await productsPage.getAllProductsPrices()
    const sortedPrice = [...productsPrices].sort((a, b) => a - b)
  //  console.log(productsPrices)
  //  console.log(sortedPrice)
    expect(productsPrices).toEqual(sortedPrice); 

}
)
}
)

test('Count Total Number of Products', async({productsPage})=>
{

    const totalProducts = await productsPage.countTotalProducts()
    console.log('Total Number of Products: '+totalProducts)
    expect(totalProducts).toBeGreaterThan(0);
     expect(totalProducts).toEqual(6)
}
) 


test('Add Multiple Products to Cart and Validate cart bage count',async({productsPage})=>
{
    const expectedCount = productsPageData.totalProductToAdd.totalToCart
    await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
    const actualCount = await productsPage.countProductsOnCart()
 //   console.log('Total Products added to Cart: ' +actualCount)
    await expect(actualCount).toBe(expectedCount)
    
}
),

test('Remove Items from Cart', async({productsPage,yourCartPage,page})=>
{
    
    await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
    await productsPage.clickOnCart()
     await yourCartPage.removeProductsFromCart(cartPageData.totalProductsToRemove.toRemove)
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible()
   
    
}
)

test.describe('Test Cart Persistence',async()=>
{
    test('Verify Cart Persistence on Page Refresh',async({productsPage,page})=>
{

    await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
    const beforeRefreshCartCount = await productsPage.countProductsOnCart()
    await page.reload()
    const afterRefreshCartCount = await productsPage.countProductsOnCart()
    await expect(afterRefreshCartCount).toBe(beforeRefreshCartCount)
}),


    test('Test Cart Persistence on New Tab', async({productsPage,context})=>
    {
    await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
    const CartCount = await productsPage.countProductsOnCart()
    const newPage = await context.newPage()
    await newPage.goto('/')
    const newTabCartCount = await productsPage.countProductsOnCart()
    await expect(newTabCartCount).toBe(CartCount)
    }

)
}

)
   
   test('Test Continue Shopping Button', async({productsPage,yourCartPage,page})=>
{
   await productsPage.addProductsToCart(productsPageData.totalProductToAdd.totalToCart)
   await productsPage.clickOnCart()
   const cartCount = await productsPage.countProductsOnCart()
   await expect(cartCount).toBeGreaterThan(0)
   await expect.soft(page).toHaveURL('/cart.html')
   await yourCartPage.clickOnContinueShopping()
   await expect.soft(page).toHaveURL('/inventory.html')

}
)


