import { addDays, differenceInDays } from 'date-fns';

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
