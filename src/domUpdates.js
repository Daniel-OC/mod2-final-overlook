import {
  user,
  hotel,
  sendBookingToApi,
  createInitialUser,
  handleInitialPromises
} from './scripts'

const dateInput = document.querySelector('#dateSelector');
const mainDisplayRight = document.querySelector('#mainDisplayRight');
const loginView = document.querySelector('#loginView');
const customerView = document.querySelector('#customerView');
const loginButton = document.querySelector('#loginButton')


let domUpdates = {
  updateInnerText(element, update) {
    element.innerText = update;
  },

  removeClass(elements, rule) {
    elements.forEach(item => item.classList.remove(rule));
  },

  addClass(elements, rule) {
    elements.forEach(item => item.classList.add(rule));
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
    bookingDisplay.innerHTML = '<h3 class="self-center pink-font" tabindex="0">Upcoming Bookings</h3>';
    user.upcomingBookings.forEach(booking => {
      bookingDisplay.innerHTML += `
    <section class="flex column around " tabindex="0" >
    <p>Room ${booking.roomNumber}, ${booking.date}</p>
    <p>$${booking.price}</p>
  </section>`
    });
  },

  updateWithOldBookings(bookingDisplay) {
    bookingDisplay.innerHTML += '<h4 class="self-center pink-font" tabindex="0">Past Bookings</h4>'
    user.pastBookings.forEach(booking => {
      bookingDisplay.innerHTML += `
    <section class="flex column around " tabindex="0">
    <p>Room ${booking.roomNumber}, ${booking.date}</p>
    <p>$${booking.price}</p>
  </section>`
    })
  },
  
  fillRightDisplay(updatedRooms) {
    console.log(updatedRooms)
    let availableRoomArea = document.querySelector('#bottomRightSection')
    if (updatedRooms.length) {
      availableRoomArea.innerHTML = ''
      updatedRooms.forEach(room => {
        availableRoomArea.innerHTML += `
        <section id="roomCard" class="flex row between full-width" tabindex="0">
              <section>
                <p class="margin-none">Room</p>
                <p class="font-xxl margin-none" tabindex="0">${room.number}</p>
              </section>
              <section class="flex row between">
                <section class="flex column" >
                  <p class="sml-mrgn-btm margin-none" tabindex="0">${room.roomType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                  <p class="sml-mrgn-btm margin-none" tabindex="0">Beds: ${room.numBeds} ${room.bedSize.charAt(0).toUpperCase() + room.bedSize.slice(1) }</p>
                  <p class="sml-mrgn-btm margin-none" tabindex="0">Bidet: ${room.bidet ? 'Yes' : 'No'}</p>
                </section>
              </section>
              <section class="flex column center">
                <button id="${room.number}" class="button">$${room.costPerNight}</button>
                <p>BOOK NOW</p>
              </section>
          </section>`
      })
    } else {
      availableRoomArea.innerHTML = ''
      availableRoomArea.innerText = "Sorry, but we don't have any openings that match your search results! Please try adjusting your search parameters."

    }
  },

  updateRightDisplay(event) {
    let updatedRooms;
    hotel.updateAvailableRooms(dateSelector.value.replaceAll("-","/"))
    if (event.target.type === 'checkbox') {
      console.log(hotel)
      user.modifyPreferredTypes(event.target.value)
      updatedRooms = user.preferredTypes.length ? hotel.filterByRoomType(user.preferredTypes) : hotel.availableRooms
    } else {
      updatedRooms = hotel.availableRooms
      domUpdates.populateRoomTypes(hotel.getAvailableRoomTypes())
    }
    domUpdates.fillRightDisplay(updatedRooms)
  },

  populateRoomTypes(roomTypes) {
    let checkboxArea = document.querySelector('#roomCheckBoxes')
    checkboxArea.innerHTML = ''
    roomTypes.forEach(type => {
      checkboxArea.innerHTML += `
      <input id="${type}" type="checkbox" value="${type}">
      <label for="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>`
    })
  },

  //should eventually prolly live in hotel or scripts

  congratulateUserOnBooking() {
    let availableRoomArea = document.querySelector('#bottomRightSection');
    availableRoomArea.innerHTML = '';
    availableRoomArea.innerText = "Congratulations, you booked the crap out of that room!"
    dateSelector.value = null;
  },

  determineRightDisplayTarget(event) {
    if (event.target.type === 'checkbox') {
      domUpdates.updateRightDisplay(event);
    } else if (event.target.classList.contains('button')) {
      console.log(event.target.id);
      sendBookingToApi(dateSelector.value.replaceAll("-","/"), event.target.id);
      domUpdates.congratulateUserOnBooking()
    } 
  },

  checkForLogIn() {
    // let username = document.querySelector('#enterUserName');
    // let password = document.querySelector('#enterPassword');
    // if (((username.value.slice(0,8) === 'customer') && (username.value.length <= 10)) && password.value === 'overlook2021') {
      domUpdates.addClass([loginView], 'hidden');
      domUpdates.removeClass([customerView], 'hidden');
      createInitialUser(25).then(handleInitialPromises)
    }
}

//Event Listeners
window.addEventListener('load', domUpdates.checkForLogIn)

dateInput.addEventListener('change', domUpdates.updateRightDisplay)

mainDisplayRight.addEventListener('click', domUpdates.determineRightDisplayTarget)

loginButton.addEventListener('click', domUpdates.checkForLogIn)


export {
  domUpdates,
}