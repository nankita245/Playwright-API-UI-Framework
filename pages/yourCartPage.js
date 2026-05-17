export class YourCartPage {
    constructor(page){

        this.page = page
        this.productsTitles = page.locator('.inventory_item_name')
        this.productsPrices = page.locator('.inventory_item_price')
        this.checkoutButton = page.getByRole('button',{name:'Checkout'})
        this.continueShopping = page.getByRole('button',{name:'Continue Shopping'})
        this.removeButton = page.getByRole('button',{name:'Remove'})
       
    }

//     async totalProductsOnCheckout()
//     {
//        const totalProductsCount = await this.productsTitles.count()
//        return totalProductsCount
//     }

//    async getProductsPrices()
//    {
//     const pricesText = await this.productsPrices.allTextContents()
    
//     const prices = pricesText.map(price =>
//         Number(parseFloat(price.replace('$', '')).toFixed(2))
//     )
//     return prices
//     }

    async clickOnContinueShopping()
    {
        await this.continueShopping.click()
    }

    async clickOnCheckoutButton()
    {
       await this.checkoutButton.click()
    }

    async removeProductsFromCart(totalProductsToRemove)
    {
        for (let i=0; i<totalProductsToRemove;i++)
        {
            await this.removeButton.first().click()
        }
      
    }


}