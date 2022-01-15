// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {getAllUsers, getAllRooms, getAllBookings, addNewBooking, deleteBooking} from './apiCalls'
import {
  domUpdates,
  
} from './domUpdates'
import Room from './classes/Room';
import Booking from './classes/Booking';
import User from './classes/User';
import Hotel from './classes/Hotel';

let user
let hotel;

Promise.all([getAllRooms, getAllBookings, getAllUsers])
  .then(data => {
    updateHotel(data);
    startSite();
  })
  .catch(error => console.log(error))





const updateHotel = (data) => {
  console.log(typeof(data[0]), data)
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers);
  
};

const startSite = () => {
  user = new User (hotel.allUsers[0]);
  user.bookings = hotel.findUsersBookings(user.id)
  console.log(user.bookings)
  console.log(user)
  domUpdates.updateLeftDisplay(user);
};


export {
  user, 
  hotel,
  updateHotel,
  startSite,
}

