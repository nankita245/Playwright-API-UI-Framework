import { YourCartPage } from "../pages/yourCartPage"
import { LoginPage } from "../pages/loginPage"
import { ProductsPage } from "../pages/productsPage"
import { CustomerInformation } from "../pages/customerInformationPage"
import {test as base, expect} from "@playwright/test"
import {CheckoutOverviewPage} from "../pages/checkoutOverviewPage"

export const test = 
base.extend({ 
    
    loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
     await use(loginPage)
     },
    
    productsPage: async({page}, use) =>{
        const productsPage = new ProductsPage(page)
        await use(productsPage)
    },

    yourCartPage: async({page}, use)=>{
       const yourCartPage = new YourCartPage(page)
       await use(yourCartPage)
    },

    customerInformation: async({page},use)=>{
        const customerInformation = new CustomerInformation(page)
        await use(customerInformation)
    },

    checkoutOverviewPage : async({page},use)=>{
        const checkoutOverviewPage = new CheckoutOverviewPage(page)
        await use (checkoutOverviewPage)
    }
    } 
)
    export { expect }

    



