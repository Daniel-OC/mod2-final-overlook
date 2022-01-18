import Room from './Room';
import User from './User';
import Booking from './Booking'

class Hotel{
  constructor(rooms, bookings, users) {
    this.allRooms = rooms.map(room => new Room(room));
    this.bookings = bookings.map(booking => new Booking(booking));
    this.allUsers = users.map(user => new User(user));
    this.availableRooms = [];
  };

  updateAvailableRooms(date) {
   let todaysBookings = this.bookings.filter(booking => booking.date === date);
   this.availableRooms = this.allRooms.reduce((acc, room) => {
     if (!todaysBookings.find(booking => booking.roomNumber === room.number)) {
       acc.push(room);
     };
     return acc;
   },[]);
  };

  getAvailableRoomTypes() {
    return this.availableRooms.reduce((acc, room) => {
      if (!acc.includes(room.roomType)) {
        acc.push(room.roomType);
      };
      return acc;
    },[]);
  };

  filterByRoomType(types) {
    return this.availableRooms.reduce((acc,room) => {
      types.forEach(type => {
        if (type === room.roomType) {
          acc.push(room);
        };
      });
      return acc;
    },[]);
  };
};

export default Hotel;