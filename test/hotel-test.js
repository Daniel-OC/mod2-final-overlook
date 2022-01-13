import { expect } from "chai";
import Hotel from "../src/classes/Hotel";
import Room from "../src/classes/Room";
import Booking from "../src/classes/Booking";
import User from "../src/classes/User";
import roomsTestData from "../src/testing-data/rooms-test-data";
import bookingData from '../src/testing-data/bookings-test-data';
import customersTestData from '../src/testing-data/customers-test-data'

describe('Hotel', () => {
  
  let hotel;
  let rooms;
  let bookings;
  let users;

  beforeEach(() => {
    rooms = roomsTestData.map(room => new Room(room));
    bookings = bookingData.map(booking => new Booking(booking));
    users = customersTestData.map(user => new User(user));
    hotel = new Hotel(hotel, rooms, bookings, users);
  });

  it('should have a bookings array', () => {
    expect(hotel.bookings).to.be.an('array');
  });

  it('should have an allRooms array', () => {
    expect(hotel.allRooms).to.be.an('array');
  });

  it('should have an availableRooms array', () => {
    expect(hotel.availableRooms).to.be.an('array');
  });

  it('should have an allUsers array', () => {
    expect(hotel.allUsers).to.be.an('array')
  });

 
})