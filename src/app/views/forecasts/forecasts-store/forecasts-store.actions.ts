import {
  HttpOpenWeatherReqData,
  CurrentWeatherCityItemModel,
  FiveDayForecastModel,
  CityGroupCurrentWeatherModel
} from './forecasts.model';

const FEATURE_KEY = '[Forecasts]';

/**
 * GetCityCurrentWeatherAction Action will be executed to send the request to openWeather API
 * @param number -  payload city id
 */
export class GetCityCurrentWeatherAction {
  public static readonly type = `${FEATURE_KEY} Get city current weather`;
  constructor(public payload: number) { }
}

/**
 * GetCityCurrentWeatherSuccessAction Action will be executed when success response is received from openWeather API
 * and state will be updated.
 * @response CurrentWeatherCityItemModel payload
 */
export class GetCityCurrentWeatherSuccessAction {
  public static readonly type = `${FEATURE_KEY} Get city current weather success`;
  constructor(public payload: CurrentWeatherCityItemModel) { }
}

/**
 * GetFiveDayForecastAction Action will be executed to send the request to openWeather API
 * @param number - payload city id
 */
export class GetFiveDayForecastAction {
  public static readonly type = `${FEATURE_KEY} Get five day forecast`;
  constructor(public payload: number) { }
}

/**
 * GetFiveDayForecastSuccessAction will be executed when success response is received from openWeather API
 * and state will be updated.
 * @response FiveDayForecastModel payload
 */
export class GetFiveDayForecastSuccessAction {
  public static readonly type = `${FEATURE_KEY} Get five day forecast success`;
  constructor(public payload: FiveDayForecastModel) { }
}

/**
 * GetCityGroupCurrentWeatherAction will be executed to send the request to openWeather API
 * @param HttpOpenWeatherReqData payload
 */
export class GetCityGroupCurrentWeatherAction {
  public static readonly type = `${FEATURE_KEY} Get city group current weather`;
}

/**
 * GetCityGroupCurrentWeatherSuccessAction will be executed when success response is received from openWeather API
 * and state will be updated.
 * @response FiveDayForecastModel payload
 */
export class GetCityGroupCurrentWeatherSuccessAction {
  public static readonly type = `${FEATURE_KEY} Get city group current weather success`;
  constructor(public payload: CityGroupCurrentWeatherModel) { }
}

export class SetErrorAction {
  public static readonly type = `${FEATURE_KEY} Set errors`;
  constructor(public readonly payload: any) { }
}
