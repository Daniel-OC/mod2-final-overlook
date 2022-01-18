
import Room from "../src/classes/Room"
import roomsTestData from "../src/testing-data/rooms-test-data";

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

describe('Room', () => {
  
  let room;
  
  beforeEach(() => {
    room = new Room(getRandomIndex(roomsTestData));
  });

  it('should store a room number', () => {
    expect(room.number).to.be.a('number');
  });

  it('should store a roomType', () => {
    expect(room.roomType).to.be.a('string');
    expect(room.roomType.length).to.be.greaterThan(0);
  });

  it('should store whether or not it has a bidet', () => {
    expect(room.bidet).to.be.a('boolean');
  });

  it('should store the bed size', () => {
    expect(room.bedSize).to.be.a('string');
    expect(room.bedSize.length).to.be.greaterThan(0);
  });

  it('should store the number of beds', () => {
    expect(room.numBeds).to.be.a('number');
    expect(room.numBeds).to.be.greaterThan(0);
  });

  it('should store the cost per night', () => {
    expect(room.costPerNight).to.be.a('number');
    expect(room.costPerNight).to.be.greaterThan(0);
  });
});