import {
  user,
  hotel,
  updateHotel,
  startSite,
} from './scripts'



let domUpdates = {
  updateInnerText(element, update) {
    element.innerText = update;
  },

  toggleClass(elements, rule) {
    elements.forEach(item => item.classList.toggle(rule));
  },

  removeClass(elements, rule) {
    elements.forEach(item => item.classList.remove(rule));
  },

  addClass(elements, rule) {
    elements.forEach(item => item.classList.add(rule));
  },

  displayUserView(user) {
    domUpdates.updateUserCost(user)
  },

  updateLeftDisplay(user) {
    let userCost = document.querySelector('#totalCost')
    let bookingDisplay = document.querySelector('#bookingDisplay')
    user.determineBookingCosts(hotel.allRooms)
    userCost.innerText = `$${user.calculateTotalCosts()}`
    domUpdates.updateUserBookings(bookingDisplay)
  },
  
  updateUserBookings(bookingDisplay) {
    bookingDisplay.innerHTML = '<h3 class="self-center pink-font">Upcoming Bookings</h3>'
    user.determineBookingCosts(hotel.allRooms)
    user.upcomingBookings.forEach(booking => {
      bookingDisplay.innerHTML += `
    <section class="flex column around ">
    <p>Room ${booking.roomNumber}, ${booking.date}</p>
    <p>$${booking.price}</p>
  </section>`
    });
    bookingDisplay.innerHTML += '<h3 class="self-center pink-font">Past Bookings</h3>'
    user.pastBookings.forEach(booking => {
      bookingDisplay.innerHTML += `
    <section class="flex column around ">
    <p>Room ${booking.roomNumber}, ${booking.date}</p>
    <p>$${booking.price}</p>
  </section>`
    })
  }
}

export {
  domUpdates,
}