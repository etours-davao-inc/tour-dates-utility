import { expect } from 'chai';
import { getStartDate, getDays, getNights, getHotelNights } from './index';
import { initDayRangeValues } from './index';
import { isEqual } from 'date-fns';

describe("Test initDayRangeValues", () => {
  it("can be imported", () => {
    expect(initDayRangeValues).to.exist
  }) 
  it("Returns expected values", () => {
    let date = new Date(2019, 0, 1);
    let duration = 3;
    let startday = 2;
    let drv = initDayRangeValues(date, duration, startday)
    expect(isEqual(drv.from, new Date(2019,0,3))).to.be.true
    expect(isEqual(drv.to, new Date(2019,0,5))).to.be.true
    expect(drv.days).to.equal(3)
    expect(drv.maxDays).to.equal(5)
    expect(drv.minDays).to.equal(3)
    expect(drv.nights).to.equal(2)
  }) 
})

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



