import {test,expect} from '@playwright/test'
import { generateBookingData } from '../../utils/randomDataGenerator.js'
import patchRequestData from '../../test-data/restfulBooker/patchRequestBodyData.json'
//import bookingApiRequestBody from '../test-data/postAPIRequestData.json' //data directly gets saved to constant



test('Test Patch API Request',async ({page,request})=>

{
    const bookingData = generateBookingData()

    const postApiResponse = await request.post('https://restful-booker.herokuapp.com/booking',

     { data: bookingData}
    )

    const postAPIResponseBody = await postApiResponse.json()
    const bookingID = postAPIResponseBody.bookingid
    console.log(postAPIResponseBody)
    console.log(bookingID)

  // validate status code
     await expect(postApiResponse.ok()).toBeTruthy()
     await expect(postApiResponse.status()).toBe(200)

   //validate json API response
     await expect(postAPIResponseBody.booking).toHaveProperty("firstname" , bookingData.firstname)
     await expect(postAPIResponseBody.booking).toHaveProperty("lastname" , bookingData.lastname)

    // validate nested json object
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkin" , bookingData.bookingdates.checkin) 
    await expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout" , bookingData.bookingdates.checkout) 
    
    console.log('============Get Request==============')
   const getApiResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
   const getResponseJson = await getApiResponse.json() 
   console.log(getResponseJson)

   //validate status code
   await expect(getApiResponse.ok()).toBeTruthy
   await expect(getApiResponse.status()).toBe(200)

   console.log('=============Generate Token==============')
   //Generate Token
   const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth',
    {
        headers:{
            "Content-Type" : "application/json"
        },
        data: {
      username: "admin",
      password: "password123"
    }
    }
   )

  expect((await tokenResponse).ok()).toBeTruthy()
  expect((await tokenResponse).status()).toBe(200)
   
   const tokenBody = await tokenResponse.json()
   const actualToken = tokenBody.token
   console.log("token Number is: "+actualToken)
   console.log('===========PATCH Request==============')

   const patchRequestResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
   {
    headers:{
        "Content-Type" : "application/json",
        "Accept": "application/json",
        "Cookie": `token=${actualToken}`
    },
    data: patchRequestData
   }
)

   expect(patchRequestResponse.ok()).toBeTruthy()
   expect(patchRequestResponse.status()).toBe(200)
  
   const patchRequestJsonBody = await patchRequestResponse.json()
    expect(patchRequestJsonBody.firstname).toBe(patchRequestData.firstname)
   expect(patchRequestJsonBody.lastname).toBe(patchRequestData.lastname)
   console.log(patchRequestJsonBody)

   console.log('=============Delete Request=============')

   const deleteAPIResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
    {
        headers:{
            "Content-Type" : "application/json",
            "Cookie" : `token=${actualToken}`
        }
    }
   )

   
   await expect(deleteAPIResponse.status()).toBe(201)
   await expect(deleteAPIResponse.statusText()).toBe('Created')

   //check if it is actually deleted
   const getAfterDelete = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
   expect(getAfterDelete.status()).toBe(404)

}
)

