import {test,expect} from '@playwright/test'
import { generateBookingData } from '../../utils/randomDataGenerator.js'

test('@APItest Test Post api request using Dynamic request body',async ({page,request})=>

{
    const bookingData = generateBookingData()

    const postApiResponse = await request.post('https://restful-booker.herokuapp.com/booking',

     { data: bookingData}
    )

    const postAPIResponseBody = await postApiResponse.json()
    console.log(postAPIResponseBody)

  // validate status code
     await expect(postApiResponse.ok()).toBeTruthy()
     await expect(postApiResponse.status()).toBe(200)

   //validate json API response
     await expect(postAPIResponseBody.booking).toHaveProperty("firstname" , bookingData.firstname)
     await expect(postAPIResponseBody.booking).toHaveProperty("lastname" , bookingData.lastname)

    // validate nested json object
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkin" , bookingData.bookingdates.checkin) 
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout" , bookingData.bookingdates.checkout) 
    
}
)
