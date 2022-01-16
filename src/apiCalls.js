const getAllUsers =
  fetch('http://localhost:3001/api/v1/customers	')
    .then(response => response.json());

// const getSingleUser =
//   fetch('http://localhost:3001/api/v1/customers/<id>')
//   .then(response => response.json());

const getAllRooms =
  fetch('http://localhost:3001/api/v1/rooms	')
  .then(response => response.json());

const getAllBookings =
  fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json());

async function addNewBooking(bookingUpdate) {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(bookingUpdate)
  })
};

async function deleteBooking(bookingUpdate) {
  return fetch('http://localhost:3001/api/v1/bookings	', {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(bookingUpdate)
  })
};


module.exports = {getAllUsers, getAllRooms, getAllBookings, addNewBooking, deleteBooking};