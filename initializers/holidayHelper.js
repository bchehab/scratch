const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class HolidayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'holidayHelper'
    this.loadPriority = 1003
    this.startPriority = 1003
    this.stopPriority = 1003
  }

  async initialize() {

    // holidays object which acts like a dictionary
    // ideally, should be a cached service call which gets proper data
    this.holidays = {
      US: {
        2018: {
          1: { 1: true, 21: true },
          2: { 18: true },
          5: { 27: true },
          7: { 4: true },
          9: { 2: true },
          10: { 14: true },
          11: { 11: true, 28: true },
          12: { 25: true }
        },
        2019: {
          1: { 1: true, 21: true },
          2: { 18: true },
          5: { 27: true },
          7: { 4: true },
          9: { 2: true },
          10: { 14: true },
          11: { 11: true, 28: true },
          12: { 25: true }
        },
        2020: {
          1: { 1: true, 21: true },
          2: { 18: true },
          5: { 27: true },
          7: { 4: true },
          9: { 2: true },
          10: { 14: true },
          11: { 11: true, 28: true },
          12: { 25: true }
        }
      },
      LB: {
        2018: {
          1: { 1: true, 6: true },
          2: { 9: true, 14: true },
          3: { 25: true },
          4: { 19: true, 21: true, 26: true, 28: true },
          5: { 1: true, 25: true },
          6: { 5: true },
          8: { 12: true, 15: true },
          9: { 1: true, 10: true },
          11: { 10: true, 22: true },
          12: { 25: true }
        },
        2019: {
          1: { 1: true, 6: true },
          2: { 9: true, 14: true },
          3: { 25: true },
          4: { 19: true, 21: true, 26: true, 28: true },
          5: { 1: true, 25: true },
          6: { 5: true },
          8: { 12: true, 15: true },
          9: { 1: true, 10: true },
          11: { 10: true, 22: true },
          12: { 25: true }
        }
      }
    }

    api.dateHelper = api.dateHelper || {}

    // returns true if it's a holiday for the specified country/year/day
    api.dateHelper.isHoliday = (inputDate, timezone, country) => {
      let date = api.dateHelper.getDate(inputDate, timezone)

      let years = this.getProperty(this.holidays, country)
      let months = this.getProperty(years, date.year)
      let days = this.getProperty(months, date.month)

      return days[date.day] === true
    }

    this.getProperty = (data, property) => {
      const prop = data[property] || {}
      return prop
    }
  }

  // async start () {}
  // async stop () {}
}