
const FEATURE_KEY = '[Core]';

export class CoreShowProgressBarAction {
  public static readonly type = `${FEATURE_KEY} Show progress bar`;
}

export class CoreHideProgressBarAction {
  public static readonly type = `${FEATURE_KEY} Hide progress bar`;
}
