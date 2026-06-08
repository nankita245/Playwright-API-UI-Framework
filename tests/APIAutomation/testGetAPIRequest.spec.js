import {test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { DateTime } from 'luxon'

test('@APItest APItestTest Get api request',async ({page,request})=>

{
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const totalPrice = faker.number.int(1000)
    const checkinDate = DateTime.now().toFormat('yyyy-MM-dd')
    const checkoutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')

    const postApiResponse = await request.post('https://restful-booker.herokuapp.com/booking',

     { data: {
    
    
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": true,
        "bookingdates": {
            "checkin": checkinDate,
            "checkout": checkoutDate
        
  }}}
    )

    const postAPIResponseBody = await postApiResponse.json()
    const bookingID = await postAPIResponseBody.bookingid
    console.log(postAPIResponseBody)
    console.log(bookingID)

  // validate status code
     await expect(postApiResponse.ok()).toBeTruthy()
     await expect(postApiResponse.status()).toBe(200)

   //validate json API response
     await expect(postAPIResponseBody.booking).toHaveProperty("firstname" , firstName)
     await expect(postAPIResponseBody.booking).toHaveProperty("lastname" , lastName)

    // validate nested json object
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkin" , checkinDate) 
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout" , checkoutDate) 
    
    console.log('==========================')
   const getApiResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
   const getResponseJson = await getApiResponse.json() 
   console.log(getResponseJson)

   //validate status code
   await expect(getApiResponse.ok()).toBeTruthy
   await expect(getApiResponse.status()).toBe(200)
  
}


)
