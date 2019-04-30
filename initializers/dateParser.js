const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class DateParser extends Initializer {
  constructor() {
    super()
    this.name = 'dateParser'
    this.loadPriority = 1001
    this.startPriority = 1001
    this.stopPriority = 1001
  }

  async initialize() {
    api.dateHelper = api.dateHelper || {}

    // convert to date object if date is a string
    api.dateHelper.getDate = (date, zone) => {
      zone = zone || 'utc'
      return typeof date === 'string' ? DateTime.fromISO(date, { zone: zone }) : date
    }
  }

  // async start () {}
  // async stop () {}
}