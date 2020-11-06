#!/usr/bin/env node

const quarantine = require(".")
const args = process.argv.slice(2,4)

if (args.length != 2) {
  console.log("Usage: quarantine <path> <agentName>")
  process.exit(1)
}

try {
  quarantine.sync(...args)
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(2)
}
