const IS_DARWIN = process.platform == "darwin"
const IS_MAC_OS = IS_DARWIN && require("os").release() >= "16"

const ATTRIBUTE = "com.apple.quarantine"
const TYPE = IS_MAC_OS ? "0081" : "0001"

const nottr = { async set(){}, setSync(){} }
const xattr = IS_DARWIN ? require("fs-xattr") : nottr

function createValue(agentName) {
  const timeStamp = Math.floor(Date.now() / 1000).toString(16)
  const eventId = require("uuid").v4().toUpperCase()
  return [ TYPE, timeStamp, agentName, eventId ].join(";")
}

module.exports = function(path, agentName) {
  return xattr.set(path, ATTRIBUTE, createValue(agentName))
}

module.exports.sync = function(path, agentName) {
  return xattr.setSync(path, ATTRIBUTE, createValue(agentName))
}
