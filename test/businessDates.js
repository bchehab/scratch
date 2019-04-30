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
    api.id.should.not.be.null()
  })

  it('settlement date test case 1: 2018-11-10,delay = 3', async () => {
    const { results } = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-11-10T00:00:00.000Z', delay: 3 }
    )

    results.businessDate.ts.should.equal(DateTime.fromISO('2018-11-15T00:00:00.000Z').ts)
    results.weekendDays.should.equal(2)
    results.holidayDays.should.equal(1)
  })

  it('settlement date test case 2: 2018-11-15,delay = 3', async () => {
    const { results } = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-11-15T00:00:00.000Z', delay: 3 }
    )

    results.businessDate.ts.should.equal(DateTime.fromISO('2018-11-19T00:00:00.000Z').ts)
    results.weekendDays.should.equal(2)
    results.holidayDays.should.equal(0)
  })

  it('settlement date test case 3: 2018-12-25,delay = 20', async () => {
    const { results } = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-12-25T00:00:00.000Z', delay: 20 }
    )

    results.businessDate.ts.should.equal(DateTime.fromISO('2019-01-18T00:00:00.000Z').ts)
    results.weekendDays.should.equal(8)
    results.holidayDays.should.equal(2)
  })

  it('invalid date exception', async () => {
    const result = await api.specHelper.runAction(
      'calcTransferDate',
      { initialDate: '2018-25-25', delay: 20 }
    )

    result.should.have.property('error')
  })

  it('missing params exception', async () => {
    const result = await api.specHelper.runAction(
      'calcTransferDate',
      {
        initialDate: '2018-25-25'
        // , delay: 20
      }
    )

    result.should.have.property('error')
  })

  it('holiday Dec 25, 2019 US', async () => {
    const { result } = await api.specHelper.runAction(
      'checkIsBusinessDay',
      { date: '2019-12-25' }
    )

    result.should.equal(false)
  })

  it('business day May 1, 2019 US', async () => {
    const { result } = await api.specHelper.runAction(
      'checkIsBusinessDay',
      { date: '2019-05-01' }
    )

    result.should.equal(true)
  })

  it('holiday May 1, 2019 LB', async () => {
    const { result } = await api.specHelper.runAction(
      'checkIsBusinessDay',
      { date: '2019-05-01', country: 'LB' }
    )

    result.should.equal(false)
  })

  it('weekend May 4, 2019', async () => {
    const { result } = await api.specHelper.runAction(
      'checkIsBusinessDay',
      { date: '2019-05-04' }
    )

    result.should.equal(false)
  })
})
