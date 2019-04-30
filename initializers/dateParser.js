const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class DateParser extends Initializer {
  constructor() {
    super()
    this.name = 'dateParser'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize() {
    api.dateHelper = api.dateHelper || {}

    api.dateHelper.getDate = (date, zone) => {
      zone = zone || 'utc'
      return typeof date === 'string' ? DateTime.fromISO(date, { zone: zone }) : date
    }
  }

  // async start () {}
  // async stop () {}
}