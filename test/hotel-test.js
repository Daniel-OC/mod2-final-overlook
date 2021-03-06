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
    hotel = new Hotel(rooms, bookings, users);
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

  it('should have an updateAvailableRooms method', () => {
    expect(hotel.updateAvailableRooms).to.be.a('function');
  });

  it('should update available rooms with a list of available rooms on a given date.', () => {
    hotel.updateAvailableRooms("2022/02/16");
    expect(hotel.availableRooms).to.deep.equal([rooms[0], rooms[1], rooms[3], rooms[4]]);
  });

  it('should have getAvailableRoomTypes method', () => {
    expect(hotel.getAvailableRoomTypes).to.be.a('function');
  });

  it('should return a list of all roomtypes for availableRooms', () => {
    hotel.updateAvailableRooms('2022/02/16');
    expect(hotel.getAvailableRoomTypes()).to.deep.equal(['residential suite', 'suite', 'single room'])

  })
 
})