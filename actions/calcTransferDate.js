'use strict'
const { Action, api } = require('actionhero')
const { DateTime } = require('luxon')
var postal = require('postal')

module.exports = class CalcTransferDate extends Action {
  constructor() {
    super()
    this.name = 'calcTransferDate'
    this.description = 'takes an initialDate and a delay, and calculates the bank settlement date'
    this.version = 1
    this.inputs = {
      initialDate: {
        required: true,
        validator: this.dateValidator
      },
      delay: {
        required: true,
        validator: this.delayValidator
      }
    }
    this.outputExample = {
      'ok': true,
      'initialQuery': {
        'initialDate': '2018-12-12T10:10:10Z',
        'delay': 3
      },
      'results': {
        'businessDate': '2018-12-15T10:10:10Z',
        'totalDays': 4,
        'holidayDays': 1,
        'weekendDays': 0
      }
    }
  }

  dateValidator(param) {
    return DateTime.fromISO(param).isValid
  }

  delayValidator(param) {
    return param > 0
  }

  async run(data) {
    const initialDate = data.params.initialDate
    const delay = data.params.delay
    const zone = data.params.zone
    const country = data.params.country

    const durations = api.dateHelper.calculateDelay(initialDate, delay, zone, country)
    let settlementDate = api.dateHelper.getDate(initialDate, zone).plus({ days: durations.totalDays })

    let results = {
      businessDate: settlementDate,
      totalDays: durations.totalDays,
      weekendDays: durations.weekendDays,
      holidayDays: durations.holidays
    }

    var channel = postal.channel('BankWire')
    channel.publish('businessDates', { results: results })

    data.response.results = results
  }
}
