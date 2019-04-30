const { Initializer, api } = require('actionhero')

module.exports = class DateValidator extends Initializer {
  constructor() {
    super()
    this.name = 'dateValidator'
    this.loadPriority = 1006
    this.startPriority = 1006
    this.stopPriority = 1006
  }

  async initialize() {
    api.dateHelper = api.dateHelper || {}

    // convert to date object if date is a string
    api.dateHelper.isValidDate = (date) => {
      return api.dateHelper.getDate(date).isValid
    }
  }

  // async start () {}
  // async stop () {}
}