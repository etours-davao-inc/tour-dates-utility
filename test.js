import { expect } from 'chai';
import { getStartDate, getDays, getNights, getHotelNights } from './index';
import { initDayRangeValues, isValidDateRange, setDayRange, resetDayRange } from './index';
import { isEqual } from 'date-fns';


describe('Test initDayRangeValues with plusMaxDays and limitdays', () => {
  it("Returns expected values when limitdays is true", () => {
    let date = new Date(2019, 0, 1);
    let duration = 3;
    let startday = 2;
    let offset = 0;
    let limitdays = true;
    let drv = initDayRangeValues(date, duration, startday, offset, limitdays)
    expect(isEqual(drv.from, new Date(2019,0,3))).to.be.true
    expect(isEqual(drv.to, new Date(2019,0,5))).to.be.true
    expect(drv.days).to.equal(3)
    expect(drv.maxDays).to.equal(3)
    expect(drv.minDays).to.equal(3)
    expect(drv.nights).to.equal(2)
    expect(drv.hotelNights).to.equal(2)
  })
  it("Returns expected values on plusMaxDays", () => {
    let date = new Date(2019, 0, 1);
    let duration = 3;
    let startday = 2;
    let offset = 0;
    let limitdays = false;
    let plusMaxDays = 3;
    let drv = initDayRangeValues(date, duration, startday, offset, limitdays, plusMaxDays)
    expect(isEqual(drv.from, new Date(2019,0,3))).to.be.true
    expect(isEqual(drv.to, new Date(2019,0,5))).to.be.true
    expect(drv.days).to.equal(3)
    expect(drv.maxDays).to.equal(6)
    expect(drv.minDays).to.equal(3)
    expect(drv.nights).to.equal(2)
    expect(drv.hotelNights).to.equal(2)
    console.log(drv)
  })       
})

describe("Test setDayRange", () => {
  it("can be imported", () => {
    expect(setDayRange).to.exist
  })
  it("resets day range when already in range", () => {
    let currentState = {
      isRange : true, 
      userInput: {
        tourDates: {
          from: "",
          to: ""
        }
      },
      data: {
        limitdays: false,
      }
    }
    let date = new Date()
    let output = { 
      isRange : false, 
      userInput: {
        tourDates: {
          from: date,
          to: date
        }
      },
      data: {
        limitdays: false,
      }      
    }
    // console.log("-----------------currentState----------------------")
    // console.log(currentState)
    // console.log('----------------output-------------------------')
    // console.log(output)
    // console.log("-------------------actual output----------------------")
    let actualOutput = setDayRange(currentState, date)
    // console.log(actualOutput)
    expect(actualOutput).to.eql(output)
  })
  it("resets day range when day range is invalid", () => {
    let date = new Date()
    let currentState = { 
      isRange : false, 
      userInput: {
        tourDates: {
          from: date,
          to: date
        }
      },
      data: {
        limitdays: false,
      }      
    }
    
    let output = { 
      isRange : false, 
      userInput: {
        tourDates: {
          from: date,
          to: date
        }
      },
      data: {
        limitdays: false,
      }      
    }
    // console.log("-----------------currentState----------------------")
    // console.log(currentState)
    // console.log('----------------output-------------------------')
    // console.log(output)
    // console.log("-------------------actual output----------------------")
    let actualOutput = setDayRange(currentState, date)
    // console.log(actualOutput)
    expect(actualOutput).to.eql(output)
  })

  it("returns a valid day range", () => {
    let currentState = {
      minDays: 3,
      maxDays: 5,
      isRange : false, 
      userInput: {
        tourDates: {
          from: new Date(2019,0,1),
          to: new Date(2019,0,1)
        }
      },
      data : {
        offsetnights: 1,
        limitdays: false
      }
    }
    let date = new Date(2019, 0, 4)
    let output = { 
      minDays: 3,
      maxDays: 5,
      isRange : true, 
      userInput: {
        tourDates: {
          days: 4,
          hotelNights: 2,
          nights: 3,
          from: new Date(2019, 0, 1),
          to: date
        }
      },
      data : {
        offsetnights: 1,
        limitdays: false
      }      
    }
    // console.log("-----------------currentState----------------------")
    // console.log(currentState)
    // console.log('----------------output-------------------------')
    // console.log(output)
    // console.log("-------------------actual output----------------------")
    let actualOutput = setDayRange(currentState, date)
    // console.log(actualOutput)
    expect(actualOutput).to.eql(output)
  })

  it("returns a fixed day range on limitDays", () => {
    let currentState = {
      minDays: 3,
      maxDays: 3,
      isRange : false, 
      userInput: {
        tourDates: {
          from: new Date(2018,0,1),
          to: new Date(2018,0,3)
        }
      },
      data : {
        offsetnights: 0,
        limitdays: true
      }
    }
    let date = new Date(2019,0,1)
    console.log('------------------')
    console.log(date)
    console.log('------------------')
    let output = {
      minDays: 3,
      maxDays: 3,
      isRange : true, 
      userInput: {
        tourDates: {
          days: 3,
          nights: 2,
          hotelNights: 2,
          from: date,
          to: new Date(2019,0,3),
        }
      },
      data: {
        offsetnights: 0,
        limitdays: true
      }
    }
    // console.log("-----------------currentState----------------------")
    // console.log(currentState)
    // console.log('----------------output-------------------------')
    // console.log(output)
    // console.log("-------------------actual output----------------------")
    let actualOutput = setDayRange(currentState, date)
    // console.log(actualOutput)
    expect(actualOutput).to.eql(output)
  })   


})

describe("Test resetDayRange", () => {
  it("can be imported", () => {
    expect(resetDayRange).to.exist
  })
  it("Returns expected result", () => {
    let date = new Date;
    let input = { 
      isRange : false, 
      userInput: {
        tourDates: {
          from: new Date(2019,0,1),
          to:  new Date(2019,0,3)
        }
      }
    }
    let output = { 
      isRange : false, 
      userInput: {
        tourDates: {
          from: date,
          to: date
        }
      }
    }
    expect(resetDayRange(input, date)).to.eql(output)
  }) 
})

describe("Test getHotelNights", () => {
  it("can be imported", () => {
    expect(getHotelNights).to.exist
  })
  it("Returns expected result", () => {
    let nights = 2;
    let offset = 1;
    expect(getHotelNights(nights, offset)).to.equal(1)
  })
})

describe("Test isValidDateRange", () => {
  it("can be imported", () => {
    expect(isValidDateRange).to.exist
  }) 
  it("Returns expected values", () => {
    let from = new Date(2019, 0, 1);
    let max = 5;
    let min = 3;
    let isValid = isValidDateRange(from, new Date(2019, 0, 3), max, min)
    let isInvalid = isValidDateRange(from, new Date(2019, 0, 6), max, min)
    let isInvalid2 = isValidDateRange(from, new Date(2019, 0, 2), max, min)
    let isInvalid3 = isValidDateRange(from, new Date(2018, 11, 30), max, min)
    expect(isValid).to.be.true
    expect(isInvalid).to.be.false
    expect(isInvalid2).to.be.false
    expect(isInvalid3).to.be.false
  }) 
})

describe("Test initDayRangeValues", () => {
  it("can be imported", () => {
    expect(initDayRangeValues).to.exist
  }) 
  it("Returns expected values", () => {
    let date = new Date(2019, 0, 1);
    let duration = 3;
    let startday = 2;
    let offset = 1;
    let drv = initDayRangeValues(date, duration, startday, offset)
    expect(isEqual(drv.from, new Date(2019,0,3))).to.be.true
    expect(isEqual(drv.to, new Date(2019,0,5))).to.be.true
    expect(drv.days).to.equal(3)
    expect(drv.maxDays).to.equal(5)
    expect(drv.minDays).to.equal(3)
    expect(drv.nights).to.equal(2)
    expect(drv.hotelNights).to.equal(1)
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



