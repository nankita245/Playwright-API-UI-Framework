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