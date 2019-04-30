const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class DelayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'delayHelper'
    this.loadPriority = 1003
    this.startPriority = 1003
    this.stopPriority = 1003
  }

  async initialize() {
    api.dateHelper = api.dateHelper || {}

    api.dateHelper.calculateDelay = (inputDate, delay, zone, country) => {
      let date = api.dateHelper.getDate(inputDate, zone)

      let totalDays = 0
      let holidays = 0
      let weekendDays = 0

      while (delay > 0) {
        const isHoliday = api.dateHelper.isHoliday(date, zone, country)

        if (isHoliday) {
          holidays++
        }

        let isBusinessDay = api.dateHelper.isBusinessDay(date, zone)

        if (!isBusinessDay) {
          weekendDays++
        }
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