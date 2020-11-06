# Gatemaker

macOS [quarantine](https://developer.apple.com/library/archive/releasenotes/Carbon/RN-LaunchServices/index.html#//apple_ref/doc/uid/TP40001369-CH1-DontLinkElementID_2) utilities for Node.js and Electron.

## Usage

```js
const quarantine = require("gatemaker")

const filePath = "~/Downloads/example.xyz"
const agentName = "Example App"

await quarantine(filePath, agentName)
// or…
quarantine.sync(filePath, agentName)
```

### Electron Support

Load `gatemaker/electron-support` in your main process to quarantine all [downloads](https://www.electronjs.org/docs/api/download-item) automatically.

```js
require("gatemaker/electron-support")
const { app } = require("electron")
// …
```

## References

- https://github.com/Homebrew/brew/pull/4656
- https://github.com/Homebrew/homebrew-cask/issues/22388
- https://github.com/reitermarkus/quarantine
- https://github.com/signalapp/Signal-Desktop/commit/1bf9ca7233b7df26afeae9ad921835fcff69b3fe
- https://stackoverflow.com/questions/21591485/using-xattr-to-set-the-mac-osx-quarantine-property
- https://developer.apple.com/documentation/coreservices/klsquarantinetypewebdownload
- https://ilostmynotes.blogspot.com/2012/06/gatekeeper-xprotect-and-quarantine.html
- https://eclecticlight.co/2017/12/11/xattr-com-apple-quarantine-the-quarantine-flag
- https://source.chromium.org/search?q=quarantine
- https://hackerone.com/reports/430463
- https://hackerone.com/reports/470637
