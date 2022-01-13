import Room from './Room';
import User from './User';
import Booking from './Booking'

class Hotel{
  constructor(rooms, bookings, users) {
    this.rooms = rooms.map(room => new Room(room));
    this.bookings = bookings.map(booking => new Booking(booking));
    this.allUsers = users.map(user => new User(user));
    this.availableRooms = []
  };
}