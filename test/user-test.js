import { expect } from "chai";
import User from "../src/classes/User"
import Hotel from '../src/classes/Hotel'
import Room from "../src/classes/Room";
import Booking from "../src/classes/Booking";
import bookingsTestData from "../src/testing-data/bookings-test-data";
import customersTestData from "../src/testing-data/customers-test-data";
import roomsTestData from '../src/testing-data/rooms-test-data'

describe('User', () => {

  let user;
  let rooms;
  let bookings;
  let users;
  let hotel;

  beforeEach(() => {
    rooms = roomsTestData.map(room => new Room(room));
    bookings = bookingsTestData.map(booking => new Booking(booking));
    users = customersTestData.map(user => new User(user));
    hotel = new Hotel(rooms, bookings, users);
    user = new User(users[0]);
  });

  it('should have an id number', () => {
    expect(user.id).to.be.a('number');
  });

  it('should have a name', () => {
    expect(user.name).to.be.a('string');
  });

  it('should have an allBookings array', () => {
    expect(user.allBookings).to.be.an('array');
  });

  it('should have an pastBookings array', () => {
    expect(user.pastBookings).to.be.an('array');
  });

  it('should have an upcomingBookings array', () => {
    expect(user.upcomingBookings).to.be.an('array');
  });

  it('should have an preferredTypes array', () => {
    expect(user.preferredTypes).to.be.an('array');
  });

  it('should have a findUsersBookings method', () => {
    expect(user.findUsersBookings).to.be.a('function')
  })

  it('should find all of a users bookings', () => {
    user.findUsersBookings(hotel)
    expect(user.allBookings).to.deep.equal([bookings[0],bookings[1]])
  })

  it('should have a determineBookingCosts method', () => {
    expect(user.determineBookingCosts).to.be.a('function');
  });

  it('should determine the cost of each booking', () => {
    user.findUsersBookings(hotel);
    user.determineBookingCosts(hotel.allRooms);
    expect(user.allBookings[0].price).to.equal(358.4);
  });

  it('should have a modifyPreferredTypes method', () => {
    expect(user.modifyPreferredTypes).to.be.a('function');
  });

  it('should add or remove a preferred type to the preferredtypes array as necessary', () => {
    expect(user.preferredTypes.length).to.equal(0);
    user.modifyPreferredTypes('suite');
    expect(user.preferredTypes[0]).to.equal('suite');
    user.modifyPreferredTypes('suite');
    expect(user.preferredTypes.length).to.equal(0);
  });

  it('should have a calculateTotalCosts method', () => {
    expect(user.calculateTotalCosts).to.be.a('function');
  });

  it('should calculate the totalCosts of all a users bookings', () => {
    user.findUsersBookings(hotel);
    user.determineBookingCosts(hotel.allRooms);
    expect(user.calculateTotalCosts()).to.deep.equal('787.84');
  });

  it('should have a divideBookingsByDate method', () => {
    expect(user.divideBookingsByDate).to.be.a('function');
  });

  it('should divide bookings into past and upcoming', () => {
    user.findUsersBookings(hotel);
    user.divideBookingsByDate();
    expect(user.pastBookings).to.deep.equal([bookings[1]]);
    //because this function is built using date.now, this test will have to be updated accordingly
    expect(user.upcomingBookings).to.deep.equal([bookings[0]]);
  });

  it('should have a createBookingObject function', () => {
    expect(user.createBookingObject).to.be.a('function');
    expect(user.createBookingObject('2022/01/06', '12')).to.deep.equal({ 
      userID: 1,
      date: '2022/01/06',
      roomNumber: 12
    });
  })
});