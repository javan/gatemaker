import Foundation

let fileURL: NSURL = NSURL(fileURLWithPath: CommandLine.arguments[1])

let properties: NSDictionary = [
  kLSQuarantineAgentNameKey: CommandLine.arguments[2],
  kLSQuarantineTypeKey: kLSQuarantineTypeWebDownload,
]

if fileURL.checkResourceIsReachableAndReturnError(nil) {
  do {
    try fileURL.setResourceValue(properties, forKey: URLResourceKey.quarantinePropertiesKey)
    exit(0)
  } catch {
    print(error.localizedDescription)
    exit(1)
  }
}

exit(2)
