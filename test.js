import { expect } from 'chai';
import { getStartDate, getDays, getNights, getHotelNights } from './index';
import { isEqual } from 'date-fns';

describe("getStartDate is working", () => {
  it("getStartDate imported", () => {
    expect(getStartDate).to.exist
  })
  it("getStartDate returns expected value", () => {
    let date = new Date(2019, 1, 1)
    expect(isEqual(getStartDate(date, 1), new Date(2019,1,2))).to.be.true;
    expect(isEqual(getStartDate(date, 2), new Date(2019,1,3))).to.be.true;
    expect(isEqual(getStartDate(date, 3), new Date(2019,1,4))).to.be.true;
    expect(isEqual(getStartDate(date, 4), new Date(2019,1,5))).to.be.true;
    expect(isEqual(getStartDate(date, 5), new Date(2019,1,6))).to.be.true;
  })
})

describe("Test getDays", () => {
  it("can be imported", () => {
    expect(getDays).to.exist
  })
  it("Returns expected result", () => {
    let from = new Date(2019, 0, 1); 
    let to = new Date(2019, 0, 3);
    expect(getDays(from, to)).to.equal(3)
  })
})

describe("Test getNights", () => {
  it("can be imported", () => {
    expect(getNights).to.exist
  })
  it("Returns expected result", () => {
    let from = new Date(2019, 0, 1); 
    let to = new Date(2019, 0, 3);
    expect(getNights(from, to)).to.equal(2)
  })
})

describe("Test getHotelNights", () => {
  it("can be imported", () => {
    expect(getHotelNights).to.exist
  })
  it("Returns expected result", () => {
    let from = new Date(2019, 0, 1); 
    let to = new Date(2019, 0, 3);
    let offset = 1;
    let nights = getNights(from, to)
    expect(getHotelNights(nights, offset)).to.equal(1)
  })
})

