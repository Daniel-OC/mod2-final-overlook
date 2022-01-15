import {
  user,
  hotel,
  updateHotel,
  startSite,
} from './scripts'

const dateInput = document.querySelector('#dateSelector');



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
    user.determineBookingCosts(hotel.allRooms);
    domUpdates.updateWithUpcomingBookings(bookingDisplay);
    domUpdates.updateWithOldBookings(bookingDisplay);
  },

  updateWithUpcomingBookings(bookingDisplay) {
    bookingDisplay.innerHTML = '<h3 class="self-center pink-font">Upcoming Bookings</h3>';
    user.upcomingBookings.forEach(booking => {
      bookingDisplay.innerHTML += `
    <section class="flex column around ">
    <p>Room ${booking.roomNumber}, ${booking.date}</p>
    <p>$${booking.price}</p>
  </section>`
    });
  },

  updateWithOldBookings(bookingDisplay) {
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
    console.log(dateSelector, dateSelector.value)
    let availableRooms = document.querySelector('#bottomRightSection')
    availableRooms.innerHTML = ''
    hotel.updateAvailableRooms(dateSelector.value.replaceAll("-","/"))
    hotel.availableRooms.forEach(room => {
      availableRooms.innerHTML += `
      <section id="roomCard" class="flex row between full-width">
            <section>
              <p class="margin-none">Room</p>
              <p class="font-xxl margin-none">${room.number}</p>
            </section>
            <section class="flex row between">
              <section class="flex column">
                <p class="sml-mrgn-btm margin-none">${room.roomType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                <p class="sml-mrgn-btm margin-none">Beds: ${room.numBeds} ${room.bedSize.charAt(0).toUpperCase() + room.bedSize.slice(1) }</p>
                <p class="sml-mrgn-btm margin-none">Bidet: ${room.bidet ? 'Yes' : 'No'}</p>
              </section>
            </section>
            <section class="flex column center">
              <button>$450</button>
              <p>BOOK NOW</p>
            </section>
        </section>`
    })
  }
}

//Event Listeners
dateInput.addEventListener('change', domUpdates.updateRightDisplay)


export {
  domUpdates,
}