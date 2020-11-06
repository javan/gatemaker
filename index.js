const xattr = require("fs-xattr")
const uuid = require("uuid")

const ATTRIBUTE = "com.apple.quarantine"
const TYPE = "0081"

function createValue(agentName) {
  const timeStamp = Math.floor(Date.now() / 1000).toString(16)
  const eventId = uuid.v4().toUpperCase()
  return [ TYPE, timeStamp, agentName, eventId ].join(";")
}

module.exports = function(path, agentName) {
  return xattr.set(path, ATTRIBUTE, createValue(agentName))
}

module.exports.sync = function(path, agentName) {
  return xattr.setSync(path, ATTRIBUTE, createValue(agentName))
}
