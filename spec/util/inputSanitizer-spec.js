const InputSanitizer = require('../../src/util/inputSanitizer')

describe('InputSanitizer', function () {
  var sanitizer, rawBlip, blip

  beforeAll(function () {
    sanitizer = new InputSanitizer()
    var description = "<b>Hello</b> <script>alert('dangerous');</script>there <h1>heading</h1>"
    rawBlip = {
      id: '1',
      name: "Hello <script>alert('dangerous');</script>there <h1>blip</h1>",
      description: description,
      ring: '<a href="/asd">Adopt</a>',
      quadrant: '<strong>techniques and tools</strong>',
      type: 'true<br>',
      highlight: 'true<br>'
    }

    blip = sanitizer.sanitize(rawBlip)
  })

  it('strips out script tags from blip id', function () {
    expect(blip.id).toEqual('1')
  })

  it('strips out script tags from blip descriptions', function () {
    expect(blip.description).toEqual('<b>Hello</b> there <h1>heading</h1>')
  })

  it('strips out all tags from blip name', function () {
    expect(blip.name).toEqual('Hello there blip')
  })

  it('strips out all tags from blip status', function () {
    expect(blip.type).toEqual('true')
  })

  it('strips out all tags from blip highlight', function () {
    expect(blip.highlight).toEqual('true')
  })

  it('strips out all tags from blip ring', function () {
    expect(blip.ring).toEqual('Adopt')
  })

  it('strips out all tags from blip quadrant', function () {
    expect(blip.quadrant).toEqual('techniques and tools')
  })

  it('trims white spaces in keys and values', function () {
    rawBlip = {
      ' name': '   Some name ',
      '   ring ': '    Some ring name '
    }
    blip = sanitizer.sanitize(rawBlip)

    expect(blip.name).toEqual('Some name')
    expect(blip.ring).toEqual('Some ring name')
  })
})

describe('Input Santizer for Protected sheet', function () {
  var sanitizer, rawBlip, blip, header
  beforeAll(function () {
    sanitizer = new InputSanitizer()
    header = [
      'id',
      'name',
      'quadrant',
      'ring',
      'type',
      'highlight',
      'description'
    ]

    rawBlip = [
      '1',
      "Hello <script>alert('dangerous');</script>there <h1>blip</h1>",
      '<strong>techniques & tools</strong>',
      "<a href='/asd'>Adopt</a>",
      'true<br>',
      'true<br>',
      "<b>Hello</b> <script>alert('dangerous');</script>there <h1>heading</h1>"
    ]

    blip = sanitizer.sanitizeForProtectedSheet(rawBlip, header)
  })

  it('strips out script tags from blip descriptions', function () {
    expect(blip.description).toEqual('<b>Hello</b> there <h1>heading</h1>')
  })

  it('strips out all tags from blip name', function () {
    expect(blip.name).toEqual('Hello there blip')
  })

  it('strips out all tags from blip type', function () {
    expect(blip.type).toEqual('true')
  })

  it('strips out all tags from blip highlight', function () {
    expect(blip.highlight).toEqual('true')
  })

  it('strips out all tags from blip ring', function () {
    expect(blip.ring).toEqual('Adopt')
  })

  it('strips out all tags from blip quadrant', function () {
    expect(blip.quadrant).toEqual('techniques & tools')
  })

  it('trims white spaces in keys and values', function () {
    rawBlip = {
      ' name': '   Some name ',
      '   ring ': '    Some ring name '
    }
    blip = sanitizer.sanitize(rawBlip)

    expect(blip.name).toEqual('Some name')
    expect(blip.ring).toEqual('Some ring name')
  })
})
