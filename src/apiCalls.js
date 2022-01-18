const checkForError = (response) => {
  if (!response.ok) {
    throw new Error('Sorry, something went wrong with your booking! Please try again, making sure you picked a date and a room that are available.');
  } else {
    return response.json();
  }
}

const getAllUsers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => checkForError(response))
    .then(data => data);
}
  
const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => checkForError(response))
  .then(data => data);
}
  
const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => checkForError(response))
  .then(data => data);
}

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => checkForError(response))
  .then(data => data);
}

const addNewBooking = (bookingUpdate) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(bookingUpdate)
  })
  .then(response => checkForError(response))
};

const deleteBooking = (bookingUpdate) => {
  return fetch('http://localhost:3001/api/v1/bookings	', {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(bookingUpdate)
  })
  .then(response => checkForError(response))
};


module.exports = {getAllUsers, getAllRooms, addNewBooking, deleteBooking, getAllBookings, getSingleUser};