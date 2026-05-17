export class CheckoutOverviewPage {
    constructor(page){

        this.page = page
        this.productsTitles = page.locator('.inventory_item_name')
        this.productsPrices = page.locator('.inventory_item_price')
        this.totalItemCards = page.locator('.cart_item')
        this.tax = page.locator('.summary_tax_label')
        this.itemTotalLabel = page.locator('.summary_subtotal_label')
        this.totalWithTax = page.locator('.summary_total_label')
        this.finishButton = page.getByRole('button',{name:'finish'})
    }

    async totalProductsOnCheckout()
    {
       const totalProductsCount = await this.productsTitles.count()
       return totalProductsCount
    }

   async getProductsPrices()
   {
    const pricesText = await this.productsPrices.allTextContents()
    
    const prices = pricesText.map(price =>
        Number(parseFloat(price.replace('$', '')).toFixed(2))
    )
    return prices
    }

    async itemTotal()
    {
        const totalText = await this.itemTotalLabel.textContent()
        return Number(parseFloat(totalText.split('$')[1]).toFixed(2))
        
    }

    async taxAmount()
    {
        const tax = await this.tax.textContent()
        return Number(parseFloat(tax.split('$')[1]).toFixed(2))
    }

    async totalAmountWithTax()
    {
        const totalAmount = await this.totalWithTax.textContent()
        return Number(parseFloat(totalAmount.split('$')[1]).toFixed(2))
    }

    async clickOnFinish()
    {
        await this.finishButton.click()
    }


}