const IDEAL_BLIP_WIDTH = 22
const Blip = function (id, name, ring, type, highlight, topic, description) {
  var self

  self = {}

  self.width = IDEAL_BLIP_WIDTH

  self.id = function () {
    return id
  }

  self.name = function () {
    return name
  }

  self.ring = function () {
    return ring
  }

  self.topic = function () {
    return topic || ''
  }

  self.type = function () {
    return type
  }

  self.highlight = function () {
    return highlight
  }

  self.description = function () {
    return description || ''
  }

  return self
}

module.exports = Blip
