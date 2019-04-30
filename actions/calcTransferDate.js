'use strict'
const { Action, api } = require('actionhero')
const { DateTime } = require('luxon')

var postal = require('postal');

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
    let dt = DateTime.fromISO(data.params.initialDate, {zone: 'utc'}).plus({ days: durations.totalDays })

    console.log(durations)

    let results = {
      businessDate: dt,
      totalDays: durations.totalDays,
      weekendDays: durations.weekendDays,
      holidayDays: durations.holidays
    }

    var channel = postal.channel("BankWire")
    channel.publish("businessDates", { results : results } )

    data.response.results = results
  }
}
