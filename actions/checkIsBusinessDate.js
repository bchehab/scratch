'use strict'
const { Action, api } = require('actionhero')
const { DateTime } = require('luxon')

module.exports = class CheckIsBusinessDate extends Action {
  constructor() {
    super()
    this.name = 'checkIsBusinessDate'
    this.description = 'an actionhero action'
    this.version = 1
    this.inputs = {
      date: {
        required: true,
        validator: this.dateValidator
      },
      country: {
        required: false,
        validator: (params) => { return params.length === 2 }
      },
      zone: {
        required: false
      }
    }
    this.outputExample = {}
  }

  dateValidator(param) {
    return DateTime.fromISO(param).isValid
  }

  async run(data) {
    data.response = { result: api.dateHelper.isBusinessDay(data.params.date, data.params.zone, data.params.country) }
  }
}
