const Blip = require('../../src/models/blip')
const Ring = require('../../src/models/ring')

describe('Blip', function () {
  var blip

  beforeEach(function () {
    blip = new Blip(
      1,
      'My Blip',
      new Ring('My Ring')
    )
  })

  it('has a name', function () {
    expect(blip.name()).toEqual('My Blip')
  })

  it('has a ring', function () {
    expect(blip.ring().name()).toEqual('My Ring')
  })

  it('is new', function () {
    blip = new Blip(
      1,
      'My Blip',
      new Ring('My Ring'),
      'new'
    )

    expect(blip.type()).toBe('new')
  })

  it('is updated', function () {
    blip = new Blip(
      1,
      'My Blip',
      new Ring('My Ring'),
      'updated'
    )

    expect(blip.type()).toBe('updated')
  })
})
