import { addDays, differenceInDays } from 'date-fns';

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

export const initDayRangeValues = (date, duration, startday) => {
  let from = getStartDate(date, startday)
  let to = addDays(from, duration-1)
  return {
    from: from,
    days: getDays(from, to),
    to: to,
    maxDays: duration+2,
    minDays: duration,
    nights: getNights(from, to)
  }
}
