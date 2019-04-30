'use strict'
const ActionHero = require('actionhero')

module.exports = class DefaultParamsMiddleWare extends ActionHero.Initializer {
  constructor() {
    super()
    this.name = 'defaultParamsMiddleware'
  }

  async initialize() {
    // initializes optional parameters to default values if they're not present in the request
    const middleware = {
      name: this.name,
      global: true,
      priority: 1000,
      preProcessor: async ({ params }) => {
        params.country = params.country || 'US'
        params.zone = params.zone || 'utc'
      }
    }

    ActionHero.api.actions.addMiddleware(middleware)
  }

  // async start() { }
  // async stop() { }
}
