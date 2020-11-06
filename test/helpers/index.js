const path = require("path")
const fs = require("fs").promises
const { tmpdir } = require("os")
const { randomBytes } = require("crypto")
let { execFile } = require("child_process")
execFile = require("util").promisify(execFile)

exports.createTempFile = async (name = randomHex(), data = "") => {
  const filePath = path.join(await tempDirPath(), name)
  await fs.writeFile(filePath, data)
  return filePath
}

exports.quarantineNative = async (filePath, agentName) => {
  const scriptPath = path.resolve(__dirname, "quarantine.swift")
  const { stdout } = await execFile("swift", [ scriptPath, filePath, agentName ])
  return stdout.toString().trim()
}

exports.getQuarantineXattr = async (filePath) => {
  const xattr = await getRawQuarantineXattr(filePath)
  const [ value, timeStamp, agentName, uuid ] = xattr.split(";")
  return { value, timeStamp, agentName, uuid }
}

function randomHex(size = 8) {
  return randomBytes(size).toString("hex")
}

async function getRawQuarantineXattr(filePath) {
  const { stdout } = await execFile("xattr", [ "-p", "com.apple.quarantine", filePath ])
  return stdout.toString().trim()
}

async function tempDirPath() {
  if (!tempDirPath.path) {
    const prefix = path.join(tmpdir(), "gatemaker-")
    tempDirPath.path = await fs.mkdtemp(prefix)
  }
  return tempDirPath.path
}
