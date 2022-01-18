// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {getAllUsers, getAllRooms, addNewBooking, deleteBooking, getAllBookings, getSingleUser} from './apiCalls'
import {
  domUpdates,
  
} from './domUpdates'
import Room from './classes/Room';
import Booking from './classes/Booking';
import User from './classes/User';
import Hotel from './classes/Hotel';

let user;
let hotel;

const handleInitialPromises = () => {
  return Promise.all([getAllRooms(), getAllBookings(), getAllUsers()])
  .then(data => {
    createHotel(data)
    updateSite()
  })
  .catch(error => console.log(error))
}

const createHotel = (data) => {
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers);
};

const updateSite = () => {
  console.log(user)
  user.allBookings = hotel.findUsersBookings(user.id);
  user.divideBookingsByDate();
  domUpdates.updateLeftDisplay(user);
};

const updateBookings = (data) => {
  hotel.bookings = data.bookings;
};

const createInitialUser = (id) => {
  return getSingleUser(id).then(data => {
    instantiateUser(data)
  })
};

const instantiateUser = (data) => {
  user = new User(data)
  console.log(user);
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
  sendBookingToApi,
  createInitialUser, 
  updateSite,
  handleInitialPromises
}

