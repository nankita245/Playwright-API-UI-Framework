export class CustomerInformation{

    constructor(page)
    {
        this.page = page
        this.firstName = page.getByPlaceholder('First Name')
        this.lastName = page.getByPlaceholder('Last Name')
        this.zipCode = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.getByRole('button',{name:'Continue'})
        this.cancelButton = page.getByRole('button',{name:'Cancel'})
    }

    async fillInformation(name,lastName,zipCode)
    {
        await this.firstName.fill(name)
        await this.lastName.fill(lastName)
        await this.zipCode.fill(zipCode)
    }

    async continueCheckout()
    {
        await this.continueButton.click()
    }

    async cancelCheckout()
    {
        await this.cancelButton.click()
    }
    
}