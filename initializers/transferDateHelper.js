const { Initializer, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class TransferDateHelper extends Initializer {
  constructor() {
    super()
    this.name = 'transferDateHelper'
    this.loadPriority = 1005
    this.startPriority = 1005
    this.stopPriority = 1005
  }

  async initialize() {
    api.transferDateHelper = {}

    // convert to date object if date is a string
    api.transferDateHelper.calculate = (params) => {
      const { initialDate, delay, timezone, country } = params

      // calculate holidays, weekends, and totalDays(delay)
      const durations = api.dateHelper.calculateDelay(initialDate, delay, timezone, country)
      // settlementDate = initialDate + totalDays
      let settlementDate = api.dateHelper.getDate(initialDate, timezone).plus({ days: durations.totalDays })

      let result = {
        ok: true,
        initialQuery: params,
        results: {
          businessDate: settlementDate,
          totalDays: durations.totalDays,
          weekendDays: durations.weekendDays,
          holidayDays: durations.holidays,
          timezone: timezone
        }
      }

      return result
    }
  }

  // async start () {}
  // async stop () {}
}