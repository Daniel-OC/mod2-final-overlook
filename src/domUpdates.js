import {
  user,
  hotel,
  updateHotel,
  sendBookingToApi,
  createInitialUser,
  updateSite,
  createHotel
} from './scripts'

const dateInput = document.querySelector('#dateSelector');
const mainDisplayRight = document.querySelector('#mainDisplayRight');
const foyer = document.querySelector('#foyer');
const landingPageGraphic = document.querySelector('#openingGraphic');
const loginView = document.querySelector('#loginView');
const customerView = document.querySelector('#customerView');
const loginButton = document.querySelector('#loginButton')


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
  
  fillRightDisplay(updatedRooms) {
    console.log(updatedRooms)
    let availableRoomArea = document.querySelector('#bottomRightSection')
    if (updatedRooms.length) {
      availableRoomArea.innerHTML = ''
      updatedRooms.forEach(room => {
        availableRoomArea.innerHTML += `
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
      user.modifyPreferredTypes(event.target.value)
      updatedRooms = user.preferredTypes.length ? domUpdates.filterByRoomType(user.preferredTypes) : hotel.availableRooms
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
  filterByRoomType(types) {
    return hotel.availableRooms.reduce((acc,room) => {
      types.forEach(type => {
        if (type === room.roomType) {
          acc.push(room)
        }
      })
      return acc
    },[])
  },

  congratulateUserOnBooking() {
    let availableRoomArea = document.querySelector('#bottomRightSection');
    availableRoomArea.innerHTML = '';
    availableRoomArea.innerText = "Congratulations, you booked the hell out the room!"
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

  showLogin() {
    domUpdates.addClass([foyer], 'hidden');
    domUpdates.removeClass([loginView], 'hidden');
  },

  checkForLogIn() {
    let username = document.querySelector('#enterUserName');
    let password = document.querySelector('#enterPassword');
    if (((username.value.slice(0,8) === 'customer') && (username.value.length <= 10)) && password.value === 'overlook2021') {
      domUpdates.addClass([loginView], 'hidden');
      domUpdates.removeClass([customerView], 'hidden');
      createInitialUser(username.value.slice(8,10))
    }
  }
  
}

//Event Listeners
dateInput.addEventListener('change', domUpdates.updateRightDisplay)

mainDisplayRight.addEventListener('click', domUpdates.determineRightDisplayTarget)

// landingPageGraphic.addEventListener('mouseover', domUpdates.showLogin)

loginButton.addEventListener('click', domUpdates.checkForLogIn)


export {
  domUpdates,
}