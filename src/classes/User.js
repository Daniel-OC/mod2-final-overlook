import { hotel, user } from "../scripts";
import Hotel from "./Hotel";

class User{
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.allBookings = [],
    this.pastBookings = [],
    this.upcomingBookings = [],
    this.preferredTypes = []
  }

  determineBookingCosts(hotelRooms) {
    this.allBookings.map(booking => {
      hotelRooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          booking.price = room.costPerNight
        }
      })
    })
  }

  modifyPreferredTypes(value) {
    if (this.preferredTypes.includes(value)) {
      user.preferredTypes.splice(user.preferredTypes.indexOf(value),1)
    } else {
      user.preferredTypes.push(value)
    }
  }

  calculateTotalCosts() {
    return parseFloat(this.allBookings.reduce((acc, booking) => {
      acc+= booking.price
      return acc
    }, 0)).toFixed(2)
  }

  divideBookingsByDate() {
    let currentDate = new Date().toISOString().substr(0,10).replaceAll("-","/")
    this.allBookings.forEach(booking => {
      if (booking.date < currentDate) {
        this.pastBookings.push(booking)
      } else {
        this.upcomingBookings.push(booking)
      }
    })
  }

  createBookingObject(date, roomNumber) {
    let bookingObject = { 
      userID: this.id,
      date: date,
      roomNumber: parseInt(roomNumber)
    }
  return bookingObject
  }
}

export default User;