const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class HolidayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'holidayHelper'
    this.loadPriority = 1001
    this.startPriority = 1001
    this.stopPriority = 1001
  }

  async initialize() {

    // todo: add locale before year

    // ideally, should be a cached service call, or db
    this.holidays = {
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
    }

    api.dateHelper = api.dateHelper || {}

    api.dateHelper.isHoliday = (inputDate, zone, country) => {
      let date = api.dateHelper.getDate(inputDate, zone)
      return this.holidays[date.year][date.month][date.day] === true
    }
  }

  // async start () {}
  // async stop () {}
}