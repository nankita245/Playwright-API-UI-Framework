// Import all functions from priceUtils.js
import { convertPriceTextToNumber } from '../utils/priceUtils.js'

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

    return pricesText.map(price =>
        convertPriceTextToNumber(price)
    )
}


    async itemTotal()
{
    const totalText = await this.itemTotalLabel.textContent()

    return convertPriceTextToNumber(
        totalText.split('$')[1]
    )
}

    async totalAmountWithTax()
    {
        const totalAmount = await this.totalWithTax.textContent()
        return convertPriceTextToNumber(
            totalAmount.split('$')[1]
        )
    }

    async clickOnFinish()
    {
        await this.finishButton.click()
    }

    async taxAmount() 
    {
    const taxText = await this.tax.textContent()
    return convertPriceTextToNumber(taxText.split('$')[1])
    }


}