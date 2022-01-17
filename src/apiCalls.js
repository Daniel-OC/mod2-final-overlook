const getInitialUsers =
  fetch('http://localhost:3001/api/v1/customers	')
    .then(response => response.json());

const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/<${id}>`)
  .then(response => response.json());
}
  
const getInitialRooms =
  fetch('http://localhost:3001/api/v1/rooms	')
  .then(response => response.json());

const getInitialBookings =
  fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json());

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json())
}

function addNewBooking(bookingUpdate) {
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


module.exports = {getInitialUsers, getInitialRooms, getInitialBookings, addNewBooking, deleteBooking, getAllBookings, getSingleUser};