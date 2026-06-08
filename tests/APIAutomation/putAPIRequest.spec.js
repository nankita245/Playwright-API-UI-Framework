import {test,expect} from '@playwright/test'
import { generateBookingData } from '../../utils/randomDataGenerator.js'


test('@APItest Create Put API Request',async ({page,request})=>

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
    
    console.log('==========================')
   const getApiResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
   const getResponseJson = await getApiResponse.json() 
   console.log(getResponseJson)

   //validate status code
   await expect(getApiResponse.ok()).toBeTruthy
   await expect(getApiResponse.status()).toBe(200)

   console.log('===========================')
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
   console.log('=========================')

   const putRequestResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
    {

        headers:{
             "Content-Type" : "application/json",
             "Accept" : "application/json",
             "Cookie" : `token=${actualToken}`

        },

        data:{
            "firstname" : "James",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
        }

    })

    //validate status code
    expect(putRequestResponse.ok()).toBeTruthy()
    expect(putRequestResponse.status()).toBe(200)

    const putRequestJson = await putRequestResponse.json()
    console.log(putRequestJson)
   
}
)
