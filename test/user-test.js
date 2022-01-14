import { expect } from "chai";
import User from "../src/classes/User"
import customersTestData from "../src/testing-data/customers-test-data";

describe('User', () => {

  let user;
  let users = customersTestData.map(user => user);

  beforeEach(() => {
    user = new User(users[0]);
  });

  it('should have an id number', () => {
    expect(user.id).to.be.a('number');
  });

  it('should have a name', () => {
    expect(user.name).to.be.a('string');
  });

  it('should have a bookings array', () => {
    expect(user.bookings).to.be.an('array');
  });

});