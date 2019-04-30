const { Initializer, api } = require('actionhero')
var postal = require('postal');

module.exports = class TransfersSubscriber extends Initializer {
  constructor() {
    super()
    this.name = 'transfersSubscriber'
    this.loadPriority = 1006
    this.startPriority = 1006
    this.stopPriority = 1006
  }

  async initialize() {
    api.transfers = {}
    api.transfers.channel = postal.channel('BankWire')
  }

  async start() {
    // subscribe to incoming transfer requests
    api.transfers.subscription = api.transfers.channel.subscribe('businessDates', function (data) {

      api.log('transfer received:', 'info', data)

      // calculate settlement date result
      api.log('calculating settlement date')
      let result = api.transferDateHelper.calculate(data)
      api.log('settlement date result:', 'info', result)

      // publish to processed channel which client(s) are listening to
      api.log('sending processed message...')
      api.transfers.channel.publish('businessDate.processed', result)
      api.log('successfully published message...')
    })
    console.log('subscribed to transfers channel')
  }

  async stop() {
    api.transfers.subscription.unsubscribe()
    console.log('unsubscribed from transfers channel')
  }
}