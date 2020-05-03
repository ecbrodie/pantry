// console.warn() is monkey-patches in order to suppress annoying
// "Setting a timer for a long period of time" messages from firestore.
// YellowBox.ignoreWarnings() could have been used, but then the
// warnings would still appear in the CLI and make debugging hard.
// See: https://github.com/facebook/react-native/issues/12981
const originalWarn = console.warn
console.warn = (message: any, ...args: any[]) => {
  if (!(typeof message === "string" && message.startsWith("Setting a timer"))) {
    originalWarn(message, ...args)
  }
}
