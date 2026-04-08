export enum Framework {
  ReactJS = "reactjs",
  NestJS = "nestjs",
  ReactNative = "react-native",
}

export enum IDE {
  Antigravity = "antigravity",
  Cursor = "cursor",
}

export interface DetectResult {
  detected: boolean;
  framework?: Framework;
}
