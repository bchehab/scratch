const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class BusinessDayHelper extends Initializer {
  constructor() {
    super()
    this.name = 'businessDayHelper'
    this.loadPriority = 1003
    this.startPriority = 1003
    this.stopPriority = 1003
  }

  async initialize() {
    api.dateHelper = api.dateHelper || {}

    api.dateHelper.isBusinessDay = (inputDate, zone) => {
      let date = api.dateHelper.getDate(inputDate, zone)
      return date.weekday < 6
    }
  }

  // async start () {}
  // async stop () {}
}