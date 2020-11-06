const test = require("tape")
const quarantine = require("..")
const { createTempFile, quarantineNative, getQuarantineXattr } = require("./helpers")

const AGENT_NAME = "Gatemaker"

test("quarantine: async", async t => {
  const file1 = await createTempFile()
  const file2 = await createTempFile()

  await quarantine(file1, AGENT_NAME)
  await quarantineNative(file2, AGENT_NAME)

  const xattr1 = await getQuarantineXattr(file1)
  const xattr2 = await getQuarantineXattr(file2)

  t.equal(xattr1.agentName, AGENT_NAME)
  t.equal(xattr2.agentName, AGENT_NAME)
  t.equal(xattr1.value, xattr2.value)
  t.notEqual(xattr1.uuid, xattr2.uuid)
  t.end()
})

test("quarantine: sync", async t => {
  const file1 = await createTempFile()
  const file2 = await createTempFile()

  quarantine.sync(file1, AGENT_NAME)
  await quarantineNative(file2, AGENT_NAME)

  const xattr1 = await getQuarantineXattr(file1)
  const xattr2 = await getQuarantineXattr(file2)

  t.equal(xattr1.agentName, AGENT_NAME)
  t.equal(xattr2.agentName, AGENT_NAME)
  t.equal(xattr1.value, xattr2.value)
  t.notEqual(xattr1.uuid, xattr2.uuid)
  t.end()
})
