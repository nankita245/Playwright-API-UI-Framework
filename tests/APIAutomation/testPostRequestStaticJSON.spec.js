import {test,expect} from '@playwright/test'
import bookingApiRequestBody from '../../test-data/restfulBooker/postAPIRequestData.json' //data directly gets saved to constant

test('@Test Post api request using static JSON File',async ({page,request})=>

{
    const postApiResponse = await request.post('https://restful-booker.herokuapp.com/booking',

     { data: bookingApiRequestBody}
    )

    const postAPIResponseBody = await postApiResponse.json()
    console.log(postAPIResponseBody)

  // validate status code
     await expect(postApiResponse.ok()).toBeTruthy()
     await expect(postApiResponse.status()).toBe(200)

   //validate json API response
     await expect(postAPIResponseBody.booking).toHaveProperty("firstname" , "Roohi")
     await expect(postAPIResponseBody.booking).toHaveProperty("lastname" , "Ramanuj")

    // validate nested json object
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkin" , "2026-08-22") 
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout" , "2026-08-16") 
    
}
)
