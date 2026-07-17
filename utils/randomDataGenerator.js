import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export function generateBookingData() {
    const checkin = DateTime.now().toFormat('yyyy-MM-dd');
    const checkout = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd');
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        bookingdates: {
      checkin,
      checkout
    }
    }
}