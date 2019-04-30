const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class BusinessDayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'businessDayHelper'
    this.loadPriority = 1002
    this.startPriority = 1002
    this.stopPriority = 1002
  }

  async initialize() {
    api.dateHelper = api.dateHelper || {}

    api.dateHelper.isWeekDay = (inputDate, timezone) => {
      let date = api.dateHelper.getDate(inputDate, timezone)
      return date.weekday < 6
    }

    api.dateHelper.isBusinessDay = (inputDate, timezone, country) => {
      // true if not be a weekend or holiday
      return api.dateHelper.isWeekDay(inputDate, timezone) && !api.dateHelper.isHoliday(inputDate, timezone, country)
    }
  }

  // async start () {}
  // async stop () {}
}