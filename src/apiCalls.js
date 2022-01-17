const getAllUsers = () => {
  return fetch('http://localhost:3001/api/v1/customers	')
    .then(response => response.json())
    .then(data => data);
}
  
const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  .then(data => data);
}
  
const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => response.json())
  .then(data => data);
}

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json())
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
};

const deleteBooking = (bookingUpdate) => {
  return fetch('http://localhost:3001/api/v1/bookings	', {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(bookingUpdate)
  })
};


module.exports = {getAllUsers, getAllRooms, addNewBooking, deleteBooking, getAllBookings, getSingleUser};