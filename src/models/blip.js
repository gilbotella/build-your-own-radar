const IDEAL_BLIP_WIDTH = 22
const Blip = function (id, name, ring, type, topic, description) {
  var self

  self = {}

  self.width = IDEAL_BLIP_WIDTH

  self.id = function () {
    return id
  }

  self.name = function () {
    return name
  }

  self.topic = function () {
    return topic || ''
  }

  self.description = function () {
    return description || ''
  }

  self.type = function () {
    return type
  }

  self.ring = function () {
    return ring
  }

  return self
}

module.exports = Blip
