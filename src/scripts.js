// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {getInitialUsers, getInitialRooms, getInitialBookings, addNewBooking, deleteBooking, getAllBookings} from './apiCalls'
import {
  domUpdates,
  
} from './domUpdates'
import Room from './classes/Room';
import Booking from './classes/Booking';
import User from './classes/User';
import Hotel from './classes/Hotel';

var user
var hotel;

Promise.all([getInitialRooms, getInitialBookings, getInitialUsers])
  .then(data => {
    createHotel(data);
    startSite();
  })
  .catch(error => console.log(error))

const createHotel = (data) => {
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers);
};

const startSite = () => {
  user = new User (hotel.allUsers[0]);
  updateSite()
};

const updateSite = () => {
  console.log(user)
  user.allBookings = hotel.findUsersBookings(user.id)
  user.divideBookingsByDate()
  domUpdates.updateLeftDisplay(user);
}

const updateBookings = (data) => {
  hotel.bookings = data.bookings;
};

const sendBookingToApi = (date, roomNumber) => {
  const booking = user.createBookingObject(date, roomNumber);
  addNewBooking(booking).then(getAllBookings).then(data => {
    updateBookings(data);
    updateSite();
  });
};



export {
  user, 
  hotel,
  createHotel,
  startSite,
  sendBookingToApi,
}

