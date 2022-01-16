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
    createHotel(data);
    startSite();
  })
  .catch(error => console.log(error))

const createHotel = (data) => {
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers);
};

const startSite = () => {
  user = new User (hotel.allUsers[0]);
  user.allBookings = hotel.findUsersBookings(user.id)
  user.divideBookingsByDate()
  console.log(user.allBookings)
  console.log(user)
  domUpdates.updateLeftDisplay(user);
};



const updateBookings = (data) => {
  console.log(hotel.bookings)
  hotel.bookings = data.bookings.map(booking => booking)
  console.log(hotel.bookings)
}

async function sendBookingToApi(date, roomNumber) { 
  let booking = user.createBookingObject(date, roomNumber);
  await addNewBooking(booking)
  await getAllBookings.then(data => updateBookings(data))
  await startSite()
}


export {
  user, 
  hotel,
  createHotel,
  startSite,
  sendBookingToApi,
}

