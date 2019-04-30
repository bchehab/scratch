'use strict'
const { Action, api } = require('actionhero')

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
      timezone: {
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
        'weekendDays': 0,
        'country': 'US',
        'timezone': 'utc'
      }
    }
  }

  dateValidator(param) {
    return api.dateHelper.isValidDate(param)
  }

  delayValidator(param) {
    return param > 0
  }

  async run(data) {
    api.log('transfer received', 'info', data.params)
    api.log('calculating settlement date')

    // calculate settlement date result
    let result = api.transferDateHelper.calculate(data.params)

    api.log('settlement date result:', 'info', result)

    // publish to topic just for the sake of testing pub/sub functionality.
    api.transfers.processTransfer(data.params)

    data.response = result
  }
}
