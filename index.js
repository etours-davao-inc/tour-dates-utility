import { addDays, differenceInDays, subDays } from 'date-fns';

export const setOptionPaymentDate = (today, startDate, callback) => {
  return new Promise((resolve, reject) => {
    let optionDate;
    let daysFromStartDay = differenceInDays(startDate, today);
    // console.log("--------------");
    // console.log(daysFromStartDay);
    if (daysFromStartDay > 30) {
      optionDate = subDays(startDate, 15)
    } else if ( daysFromStartDay > 13 && daysFromStartDay < 30 ) {
      optionDate = subDays(startDate, 14)
    } else if ( daysFromStartDay > 7 && daysFromStartDay < 14 ) {
      optionDate = subDays(startDate, 7)
    } else if ( daysFromStartDay <= 7 && daysFromStartDay >= 5 ) {
      optionDate = addDays(today, 1)
    } else if ( daysFromStartDay < 5 ) {
      optionDate = today;
    }
    resolve(optionDate);
  })
}

export const setDayRange = (state, date) => {
  if (state.data.limitdays) {
    return setWithLimitDays(state, date)
  } else {
    return setWithNoLimitDays(state, date)
  }
}

const setWithLimitDays = (state, date) => {
  state.userInput.tourDates.from = date
  let to = addDays(date, state.minDays-1)
  state.userInput.tourDates.to = to
  state.userInput.tourDates.days = state.minDays
  let nights = getNights(date, to)
  state.userInput.tourDates.nights = nights
  let offset = state.data.offsetnights
  state.userInput.tourDates.hotelNights = getHotelNights(nights, offset)
  state.isRange = true
  return state
}

const setWithNoLimitDays = (state, date) => {
  if (state.isRange) {
    state = resetDayRange(state, date)
  } else { 
    let { minDays, maxDays } = state
    let from = state.userInput.tourDates.from
    let days = getDays(from, date)
    let nights = getNights(from, date)
    let isValidRange = isValidDateRange(from, date, maxDays, minDays)
    if (isValidRange) {
      let offset = state.data.offsetnights
      state.userInput.tourDates.to = date
      state.userInput.tourDates.days = days
      state.userInput.tourDates.nights = nights
      state.userInput.tourDates.hotelNights = getHotelNights(nights, offset)
      state.isRange = true
    } else {
      state = resetDayRange(state, date) 
    }
  }
  return state
}

export const resetDayRange = (state, date) => {
  state.isRange = false;
  state.userInput.tourDates.from = date;
  state.userInput.tourDates.to = date;
  return state
}

export const isValidDateRange = (from, to, max, min) => {
  let days = getDays(from, to)
  let isWithinAcceptableDays = days >= min && days <= max
  console.log(days, isWithinAcceptableDays)
  return isWithinAcceptableDays
}

export const getStartDate = (date, startday) => {
  return addDays(date, startday)
}

export const getNights = (from, to) => {
  return differenceInDays(to, from)
}

export const getDays = (from, to) => {
  return getNights(from, to) + 1
} 

export const getHotelNights = (nights, offset) => {
  return nights - offset
}


// To Do: add limitdays
export const initDayRangeValues = (date, duration, startday, offset, limitdays=false, plusMaxDays=2) => {
  let from = getStartDate(date, startday)
  let to = addDays(from, duration-1)
  let nights = getNights(from, to)
  let maxDays = limitdays ? duration : duration + plusMaxDays
  return {
    from: from,
    days: getDays(from, to),
    to: to,
    maxDays: maxDays,
    minDays: duration,
    nights: nights,
    hotelNights: getHotelNights(nights, offset),
  }
}
