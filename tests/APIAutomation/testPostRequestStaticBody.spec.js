import {test,expect} from '@playwright/test'
import { postAPIRequestData } from '../../test-data/restfulBooker/postAPIRequestData'

test('Test Post api request using static request body',async ({page,request})=>

{
    const postApiResponse = await request.post('https://restful-booker.herokuapp.com/booking',

     { data: {
    
    
        "firstname": "disha",
        "lastname": "Gupta",
        "totalprice": 452,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-08-22",
            "checkout": "2026-08-16"
        
    }
}}
    )

    // validate status code
     await expect(postApiResponse.ok()).toBeTruthy()
     await expect(postApiResponse.status()).toBe(200)

    //get response body
    const postAPIResponseBody = await postApiResponse.json()
    console.log(postAPIResponseBody)

   //validate json API response
     await expect(postAPIResponseBody.booking).toHaveProperty("firstname" , "disha")
     await expect(postAPIResponseBody.booking).toHaveProperty("lastname" , "Gupta")

    // validate nested json object
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkin" , "2026-08-22") 
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout" , "2026-08-16") 
    

  
}
)
