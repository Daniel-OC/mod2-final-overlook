import { expect } from "chai";
import Booking from "../src/classes/Booking"
import bookingData from '../src/testing-data/bookings-test-data'

describe('Booking', () => {

  let booking;
  const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length)}

  beforeEach(() => {
    booking = new Booking(bookingData[getRandomIndex(bookingData)])
  })

  it('should have an id', () => {
    expect(booking.id).to.be.a('string')
  });

  it('should have a UserID', () => {
    expect(booking.userID).to.be.a('number')
  });

  it('should have a date', () => {
    expect(booking.date).to.be.a('string')
    expect(booking.date.length).to.equal(10)
  })

  it('should have a roomNumber', () => {
    expect(booking.roomNumber).to.be.a('number')
  })

});