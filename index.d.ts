// Temporary patch of the NativeBase.Content type
// See: https://github.com/GeekyAnts/NativeBase/pull/2622
declare module "native-base" {
  namespace NativeBase {
    interface Content {
      enableOnAndroid?: boolean
    }
  }
}
