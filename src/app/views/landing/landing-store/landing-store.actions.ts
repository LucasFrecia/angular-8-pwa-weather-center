const FEATURE_KEY = '[Landing]';

/**
 * SetSelectedCitiesAction will reset the cities dropdown
 * @param HttpOpenWeatherReqData payload
 */
export class ResetFormAction {
  public static readonly type = `${FEATURE_KEY} Reset form`;
}

export class ResetSelectedIds {
  public static readonly type = `${FEATURE_KEY} Reset selected Ids`;
}

export class ViewCitiesAction {
    public static readonly type = `${FEATURE_KEY} View cities`;
}

