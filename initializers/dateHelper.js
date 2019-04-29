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
    api.dateHelper.isBusinessDay = (date) => {
      let data = date
      if (typeof data === 'string') {
        data = DateTime.fromISO(date, {zone: 'utc'})
      }
      return data.weekday < 6
    }

    api.dateHelper.calculateDelay = (date, delay) => {
      let date1 = DateTime.fromISO(date, {zone: 'utc'})

      let totalDays = 0
      let holidays = 0
      let weekendDays = 0

      while (delay > 0) {
        const isHoliday = api.dateHelper.isHoliday(date1)
        if (isHoliday) {
          holidays++
        }
        let isBusinessDay = api.dateHelper.isBusinessDay(date1)
        if (!isBusinessDay) {
          weekendDays++
        }
        else if (!isHoliday) {
          delay--
        }

        console.log(date1.toISODate())
        console.log("businessDay: " + isBusinessDay)
        console.log("holiday: " + isHoliday)

        date1 = date1.plus({ days: 1 })
        totalDays++
      }

      console.log('test: ' + DateTime.fromISO(date, {zone: 'utc'}).plus({ days: totalDays }).toISODate())

      return { totalDays: totalDays, holidays: holidays, weekendDays: weekendDays }
    }
  }

  // async start () {}
  // async stop () {}
}