import { CityGroupCurrentWeatherModel } from 'app/views/forecasts/forecasts-store/forecasts.model';

const FEATURE_KEY = '[Ticker]';

export class GetTickerDataAction {
    public static readonly type = `${FEATURE_KEY} Get ticker data`;
}

export class GetTickerDataSuccessAction {
    public static readonly type = `${FEATURE_KEY} Get ticker data success`;
    constructor(public payload: CityGroupCurrentWeatherModel) { }
}

export class SetTickerErrorAction {
    public static readonly type = `${FEATURE_KEY} Set ticker errors`;
    constructor(public readonly payload: any) { }
}
