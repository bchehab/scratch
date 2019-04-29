'use strict'
const { Action, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class CalcTransferDate extends Action {
  constructor() {
    super()
    this.name = 'calcTransferDate'
    this.description = 'an actionhero action'
    this.version = 1
    this.inputs = {
      initialDate: {
        required: true
      },
      delay: {
        required: true
      }
    }
    this.outputExample = {}
  }

  async run(data) {

    const durations = api.dateHelper.calculateDelay(data.params.initialDate, data.params.delay)
    let dt = DateTime.fromISO(data.params.initialDate).plus({ days: durations.totalDays })

    console.log(durations)
    data.response.results = {
      businessDate: dt,
      totalDays: durations.totalDays,
      weekendDays: durations.weekendDays,
      holidayDays: durations.holidays
    }
  }
}
