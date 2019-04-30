'use strict'
const { Action, api } = require('actionhero')

module.exports = class CheckIsBusinessDay extends Action {
  constructor() {
    super()
    this.name = 'checkIsBusinessDay'
    this.description = 'checks if the given date is a normal working day'
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
      timezone: {
        required: false
      }
    }
    this.outputExample = { 'result': true }
  }

  dateValidator(param) {
    return api.dateHelper.isValidDate(param)
  }

  async run(data) {
    data.response = { result: api.dateHelper.isBusinessDay(data.params.date, data.params.timezone, data.params.country) }
  }
}
