const sanitizeHtml = require('sanitize-html')
const _ = {
  forOwn: require('lodash/forOwn')
}

const InputSanitizer = function () {
  var relaxedOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul',
      'br', 'p', 'u'],
    allowedAttributes: {
      a: ['href']
    }
  }

  var restrictedOptions = {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: function (text) {
      return text.replace(/&amp;/, '&')
    }
  }

  function trimWhiteSpaces (blip) {
    var processedBlip = {}
    _.forOwn(blip, function (value, key) {
      processedBlip[key.trim()] = value.trim()
    })
    return processedBlip
  }

  var self = {}
  self.sanitize = function (rawBlip) {
    var blip = trimWhiteSpaces(rawBlip)
    blip.id = sanitizeHtml(blip.id, relaxedOptions)
    blip.description = sanitizeHtml(blip.description, relaxedOptions)
    blip.name = sanitizeHtml(blip.name, restrictedOptions)
    blip.type = sanitizeHtml(blip.type, restrictedOptions)
    blip.highlight = sanitizeHtml(blip.highlight, restrictedOptions)
    blip.ring = sanitizeHtml(blip.ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions)

    return blip
  }

  self.sanitizeForProtectedSheet = function (rawBlip, header) {
    var blip = trimWhiteSpaces(rawBlip)

    const idIndex = header.indexOf('id')
    const descriptionIndex = header.indexOf('description')
    const nameIndex = header.indexOf('name')
    const typeIndex = header.indexOf('type')
    const highlightIndex = header.indexOf('highlight')
    const quadrantIndex = header.indexOf('quadrant')
    const ringIndex = header.indexOf('ring')

    const id = idIndex === -1 ? '' : blip[idIndex]
    const description = descriptionIndex === -1 ? '' : blip[descriptionIndex]
    const name = nameIndex === -1 ? '' : blip[nameIndex]
    const type = typeIndex === -1 ? '' : blip[typeIndex]
    const highlight = highlightIndex === -1 ? '' : blip[highlightIndex]
    const ring = ringIndex === -1 ? '' : blip[ringIndex]
    const quadrant = quadrantIndex === -1 ? '' : blip[quadrantIndex]

    blip.id = sanitizeHtml(id, relaxedOptions)
    blip.description = sanitizeHtml(description, relaxedOptions)
    blip.name = sanitizeHtml(name, restrictedOptions)
    blip.type = sanitizeHtml(type, restrictedOptions)
    blip.highlight = sanitizeHtml(highlight, restrictedOptions)
    blip.ring = sanitizeHtml(ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(quadrant, restrictedOptions)

    return blip
  }

  return self
}

module.exports = InputSanitizer
