import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export function generateBookingData() {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        "bookingdates": {
        "checkin": "2026-05-13",
        "checkout": "2026-05-18"
  }
    }
}