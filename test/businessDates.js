'use strict'

const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
const { DateTime } = require('luxon')
var chai = require('chai')
chai.use(require('chai-datetime'))

let api

var should = require('should')

describe('Business Dates Tests', () => {
  before(async () => {
    api = await actionhero.start()
  })

  after(async () => {
    await actionhero.stop()
  })

  it('should have booted into the test env', () => {
    process.env.NODE_ENV.should.equal('test')
    api.env.should.equal('test')
  })

  it('business date test case 1', async () => {
    const { results } = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-11-10T00:00:00.000Z', delay: 3 }
    )

    results.businessDate.ts.should.equal(DateTime.fromISO('2018-11-15T00:00:00.000Z').ts)
    results.weekendDays.should.equal(2)
    results.holidayDays.should.equal(1)
  })

  it('business date test case 2', async () => {
    const { results } = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-11-15T00:00:00.000Z', delay: 3 }
    )

    results.businessDate.ts.should.equal(DateTime.fromISO('2018-11-19T00:00:00.000Z').ts)
    results.weekendDays.should.equal(2)
    results.holidayDays.should.equal(0)
  })

  it('business date test case 3', async () => {
    const { results } = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-12-25T00:00:00.000Z', delay: 20 }
    )

    results.businessDate.ts.should.equal(DateTime.fromISO('2019-01-18T00:00:00.000Z').ts)
    results.weekendDays.should.equal(8)
    results.holidayDays.should.equal(2)
  })
})
