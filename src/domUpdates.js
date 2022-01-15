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
  },


  //to do tomorrow to function below:
  
  updateRightDisplay() {
    let dateInput = document.querySelector('#dateSelector')
    let availableRooms = document.querySelector('#bottomRightSection')
    if (dateInput.value) {
      hotel.updateAvailableRooms(dateInput)
    }
    hotel.availableRooms.forEach(room => {
      availableRooms.innerHTML += `
      <section id="roomCard" class="flex row between full-width">
            <section>
              <p class="margin-none">Room ${room.roomNumber}</p>
              <p class="font-xxl margin-none">15</p>
            </section>
            <section class="flex row between">
              <section class="flex column">
                <p class="sml-mrgn-btm margin-none">${room.roomType}</p>
                <p class="sml-mrgn-btm margin-none">Beds:${room.beds} ${room.bedSize}</p>
                <p class="sml-mrgn-btm margin-none">Bidet: ${room.bidet}</p>
              </section>
            </section>`
    })
  }
}

export {
  domUpdates,
}