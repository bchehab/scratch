'use strict'
const ActionHero = require('actionhero')

module.exports = class CheckIsBusinessDate extends ActionHero.Action {
  constructor() {
    super()
    this.name = 'checkIsBusinessDate'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run(data) {
    // your logic here
  }
}