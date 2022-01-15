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
    userCost.innerText = `$${hotel.determineUserBookingsCost(hotel.findUsersBookings(user.id))}`
    domUpdates.updateUserBookings (bookingDisplay)
  }
}

export {
  domUpdates,
}