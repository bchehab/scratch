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

    api.dateHelper.isBusinessDay = (inputDate, zone) => {
      let date = api.dateHelper.getDate(inputDate, zone)
      return date.weekday < 6
    }
  }

  // async start () {}
  // async stop () {}
}