const { Initializer, api } = require('actionhero')
var postal = require('postal');

module.exports = class TransfersSubscriber extends Initializer {
  constructor() {
    super()
    this.name = 'transfersSubscriber'
    this.loadPriority = 1002
    this.startPriority = 1002
    this.stopPriority = 1002
  }

  async initialize() {
    api.transfers = {}
    api.transfers.channel = postal.channel("BankWire")
  }

   async start () {
    api.transfers.subscription = api.transfers.channel.subscribe("businessDates", function (data) {
      console.log('transfer received:')
      console.log(data)
    });
    console.log('subscribed to transfers channel')
   }
   
   async stop () {
    api.transfers.subscription.unsubscribe()
    console.log('unsubscribed from transfers channel')
   }
}