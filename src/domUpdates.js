import {
  user,
  hotel,
  updateHotel,
  startSite,
} from './scripts'

const dateInput = document.querySelector('#dateSelector');
const mainDisplayRight = document.querySelector('#mainDisplayRight')


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
    let availableRoomArea = document.querySelector('#bottomRightSection')
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
              <button>$${room.costPerNight}</button>
              <p>BOOK NOW</p>
            </section>
        </section>`
    })
  },

  updateRightDisplay() {
    hotel.updateAvailableRooms(dateSelector.value.replaceAll("-","/"))
    domUpdates.populateRoomTypes(hotel.getAvailableRoomTypes())
    domUpdates.determineCheckedTag()
    
    // if (for ())) {
    //   var updatedRooms = domUpdates.filterByRoomType(domUpdates.determineCheckedTag(checkboxes))
    // } else {
      var updatedRooms = hotel.availableRooms
    // }
    domUpdates.fillRightDisplay(updatedRooms)
  },

  determineCheckedTag() {
    var checkboxes = document.querySelectorAll('.checkbox')
    console.log(checkboxes)
    let checkboxChecked
    
    
  },

  populateRoomTypes(roomTypes) {
    let checkboxArea = document.querySelector('#roomCheckBoxes')
    checkboxArea.innerHTML = ''
    roomTypes.forEach(type => {
      checkboxArea.innerHTML += `
      <input type="checkbox" value="${type}" class"checkbox" >
      <label for="single">${type.charAt(0).toUpperCase() + type.slice(1)}</label>`
    })
  },
  
  pickRoomType(type) {
    filterByRoomTypes(type)
  },

  //should eventually prolly live in hotel or scripts
  filterByRoomType(type) {
    return hotel.availableRooms.filter(room => room.roomType === type)
  },

  determineRightDisplayTarget(event) {
    if (event.target.tagName === 'checkbox') {
      console.log("tagname!",event.target.tagName)
      domUpdates.updateRightDisplay()
    } 
  }
}

//Event Listeners
dateInput.addEventListener('change', domUpdates.updateRightDisplay)

mainDisplayRight.addEventListener('click', domUpdates.determineRightDisplayTarget)


export {
  domUpdates,
}