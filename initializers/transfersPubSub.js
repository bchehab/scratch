const { Initializer, api } = require('actionhero')
var postal = require('postal');

module.exports = class TransfersPubSub extends Initializer {
  constructor() {
    super()
    this.name = 'transfersPubSub'
    this.loadPriority = 1007
    this.startPriority = 1007
    this.stopPriority = 1007
  }

  async initialize() {
    api.transfers = {}

    api.transfers.channel = postal.channel('BankWire')

    // publishes a transfer request to calculate settlement date
    api.transfers.processTransfer = (data) => {
      api.transfers.channel.publish('businessDates', data)
    }
  }

  async start() {
    // subscribe to incoming transfer requests, and calculate settlement date
    api.transfers.subscription = api.transfers.channel.subscribe('businessDates', function (data) {

      api.log('transfer received:', 'info', data)

      // calculate settlement date result
      api.log('calculating settlement date')
      let result = api.transferDateHelper.calculate(data)
      api.log('settlement date result:', 'info', result)

      // publish the result to the "processed" channel to notify any listening client(s)
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