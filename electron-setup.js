if (process.platform == "darwin") {
  const { app } = require("electron")
  const observer = require("./electron-observer")
  const quarantine = require(".")

  observer.on("download-completed", quarantineDownload)

  function quarantineDownload(download) {
    const path = download.getSavePath()
    const agentName = app.name
    quarantine(path, agentName)
  }
}
