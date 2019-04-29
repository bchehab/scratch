const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class HolidayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'holidayHelper'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize() {

    // todo: add locale & year for holidays
    // this.holidays = '20180101', '20180121', '20180218', '20180527', '20180704', '20180902', '20180121'

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

    api.dateHelper = {}

    api.dateHelper.isHoliday = (date) => {
      date = DateTime.fromISO(date, {zone: 'utc'})
      return this.holidays[date.year][date.month][date.day] ? true : false;
    }
  }

  // async start () {}
  // async stop () {}
}