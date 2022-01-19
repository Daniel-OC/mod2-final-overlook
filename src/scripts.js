// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import {getAllUsers, getAllRooms, addNewBooking, deleteBooking, getAllBookings, getSingleUser} from './apiCalls'
import { domUpdates } from './domUpdates'
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
  .catch(error => displayFetchErrorMessage(error))
}

const createInitialUser = (id) => {
  const username = document.querySelector('#username')
  return getSingleUser(id).then(data => {
    instantiateUser(data)
    domUpdates.updateInnerText(username, user.name)
  }).catch(error => displayFetchErrorMessage(error))
};

const sendBookingToApi = (date, roomNumber) => {
  const booking = user.createBookingObject(date, roomNumber);
  addNewBooking(booking).then(getAllBookings).then(data => {
    updateBookings(data);
    updateSite();
  }).catch(error => displayFetchErrorMessage(error));
};

const displayFetchErrorMessage = (error) => {
  let message;
  let bottomRightSection = document.querySelector('#bottomRightSection')
  if (error.message === 'Failed to fetch') {
    message = 'Something went wrong. Please check your internet connection';
  } else {
    message = error.message;
  }
  domUpdates.updateInnerText(bottomRightSection, message);
}

const createHotel = (data) => {
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers);
};

const updateSite = () => {
  user.findUsersBookings(hotel);
  user.divideBookingsByDate();
  domUpdates.updateLeftDisplay(user);
};

const updateBookings = (data) => {
  hotel.bookings = data.bookings;
};

const instantiateUser = (data) => {
  user = new User(data)
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

