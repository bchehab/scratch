'use strict'
const ActionHero = require('actionhero')

module.exports = class DefaultParamsMiddleWare extends ActionHero.Initializer {
  constructor() {
    super()
    this.name = 'defaultParamsMiddleware'
  }

  async initialize() {
    ActionHero.api['defaultParamsMiddleware'] = {
      name: this.name,
      global: true,
      preProcessor: async ({ params }) => {
        params.country = params.country || 'US'
        params.zone = params.zone || 'utc'
      }
    }
  }

  // async start() { }
  // async stop() { }
}
