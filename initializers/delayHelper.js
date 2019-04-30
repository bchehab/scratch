const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class DelayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'delayHelper'
    this.loadPriority = 1004
    this.startPriority = 1004
    this.stopPriority = 1004
  }

  async initialize() {
    // calculate number of weekends, holidays, and total delay
    api.dateHelper = api.dateHelper || {}

    api.dateHelper.calculateDelay = (inputDate, delay, zone, country) => {
      let date = api.dateHelper.getDate(inputDate, zone)

      let totalDays = 0
      let holidays = 0
      let weekendDays = 0

      while (delay > 0) {
        let isHoliday = api.dateHelper.isHoliday(date, zone, country)
        let isBusinessDay = api.dateHelper.isBusinessDay(date, zone)

        if (isHoliday) {
          holidays++
        }

        if (!isBusinessDay) {
          weekendDays++
        }

        // only decrease the delay if it's a working day
        else if (!isHoliday) {
          delay--
        }

        date = date.plus({ days: 1 })
        totalDays++
      }

      return { totalDays: totalDays, holidays: holidays, weekendDays: weekendDays }
    }
  }

  // async start () {}
  // async stop () {}
}