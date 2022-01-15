import { hotel } from "../scripts";
import Hotel from "./Hotel";

class User{
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.allBookings = [],
    this.pastBookings = [],
    this.upcomingBookings = []
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

  calculateTotalCosts() {
    return parseFloat(this.allBookings.reduce((acc, booking) => {
      acc+= booking.price
      return acc
    }, 0)).toFixed(2)
  }

  divideBookingsByDate() {
    let currentDate = new Date().toISOString().substr(0,10).replaceAll("-","/")
    console.log(currentDate)

  }
}

export default User;