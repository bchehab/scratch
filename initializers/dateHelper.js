const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class DateHelper extends Initializer {
  constructor() {
    super()
    this.name = 'dateHelper'
    this.loadPriority = 1001
    this.startPriority = 1001
    this.stopPriority = 1001
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

    api.dateHelper.isBusinessDay = (date) => {
      let data = date
      if (typeof data === 'string') {
        data = DateTime.fromISO(date)
      }
      return data.weekday < 6
    }

    api.dateHelper.isHoliday = (date) => {
      date = DateTime.fromISO(date)
      return this.holidays[date.year][date.month][date.day];
    }

    api.dateHelper.calculateDelay = (date, delay) => {
      let date1 = DateTime.fromISO(date)

      let totalDays = 0
      let holidays = 0
      let weekendDays = 0

      while (delay >= 0) {
        date1 = date1.plus({ days: 1 })
        console.log(date1.toISODate())
        const isHoliday = api.dateHelper.isHoliday(date1)
        if (isHoliday) {
          holidays++
        }
        if (!api.dateHelper.isBusinessDay(date1)) {
          weekendDays++
        }
        else if (!isHoliday) {
          delay--
        }
        totalDays++
      }

      console.log('test: ' + DateTime.fromISO(date).plus({ days: totalDays }).toISODate())

      return { totalDays: totalDays, holidays: holidays, weekendDays: weekendDays }
    }
  }

  // async start () {}
  // async stop () {}
}