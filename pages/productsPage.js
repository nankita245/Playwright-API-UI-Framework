import { expect } from "@playwright/test"
export class ProductsPage{

    constructor (page)
    {
        this.page = page
        this.pageTitle = page.locator('.app_logo')
        this.sortDropDown = page.locator('.product_sort_container')
        this.productTitles = page.locator('.inventory_item_name ')
        this.productPrices = page.locator('.inventory_item_price')
        this.totalProducts = page.locator('.inventory_item')
        this.addToCartButton = page.getByRole('button',{name:'Add to cart'})
        this.shoppingCartBadge = page.locator('.shopping_cart_badge')
        
    }

    async isOnInventoryPage()
    {
        await expect(this.page).toHaveURL(/inventory/)
    }

    async selectSortOption(optionValue)
    {
       await this.sortDropDown.selectOption(optionValue)
    }

    async getAllProductsNames()
    {
       const productNamesText = await this.productTitles.allTextContents()
       return productNamesText
    }

    async getAllProductsPrices()
    {
      const pricesText = await this.productPrices.allTextContents()
     return pricesText.map(p => parseFloat(p.replace('$', '')))
    }

    async countTotalProducts()
    {
      const totalProducts = await this.totalProducts.count()
      return totalProducts
      
    }

    async addProductsToCart(totalProductToAdd)
    {
        for(let i=0;i<totalProductToAdd;i++)
        {
          await this.addToCartButton.nth(i).click()
        }
        
    }

    async countProductsOnCart()
    {
       const cartCount = await this.shoppingCartBadge.textContent()
       return parseInt(cartCount)
    }

    async clickOnCart()
    {
       await this.shoppingCartBadge.click()
    }


    


}
