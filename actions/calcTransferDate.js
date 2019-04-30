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
      },
      country: {
        required: false,
        validator: (params) => { return params.length === 2 }
      },
      zone: {
        required: false
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
    api.log('transfer received', 'info', data.params)
    // calculate settlement date result
    api.log('calculating settlement date')
    let result = api.transferDateHelper.calculate(data.params)
    api.log('settlement date result:', 'info', result)

    var channel = postal.channel('BankWire')
    channel.publish('businessDates', data.params)

    data.response = result
  }
}
