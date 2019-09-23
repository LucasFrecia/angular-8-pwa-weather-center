import {
    State,
    Selector,
    Action,
    StateContext,
    Store,
} from '@ngxs/store';
import {
    GetTickerDataAction,
    GetTickerDataSuccessAction,
    SetTickerErrorAction
} from './ticker-store.actions';
import { TickerStateModel } from './ticker-store.model';
import { CityGroupCurrentWeatherModel } from 'app/views/forecasts/forecasts-store/forecasts.model';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ForecastsService } from 'app/views/forecasts/forecasts.service';
import { DEFAULT_CITY_DATA } from 'app/views/landing/landing-store/landing-store.state';

const FEATURE_ID = 'tickerStore';

@State<TickerStateModel>({
    name: FEATURE_ID,
    defaults: {
        tickerData: [],
        errors: null
    }
})

export class TickerStoreState {

    constructor(
        private store: Store,
        private service: ForecastsService) { }

    @Selector()
    public static getAllCityTEmperaturesState(
        state: TickerStateModel
    ): string[] {
        return state.tickerData;
    }

    @Action(
        GetTickerDataAction,
        { cancelUncompleted: true }
    )
    public getTickerData(
        context: StateContext<TickerStateModel>,
        action: GetTickerDataAction
    ): Observable<CityGroupCurrentWeatherModel> {

        const ownDataCityIds = DEFAULT_CITY_DATA.map(x => x.id).join();

        return this.service
            .getMultipleCityCurrentWeather(ownDataCityIds)
            .pipe(
                tap(data => this.store.dispatch(new GetTickerDataSuccessAction(data))),
                catchError(errors => this.store.dispatch(new SetTickerErrorAction(errors)))
            );
    }

    @Action(GetTickerDataSuccessAction)
    public getTickerDataSuccess(
        context: StateContext<TickerStateModel>,
        action: GetTickerDataSuccessAction
    ): any {

        const tickerData: string[] = action.payload.list.map(item =>
            `${item.name} ${item.main.temp}`
        );

        context.patchState({
            tickerData
        });
    }

    @Action(SetTickerErrorAction)
    public setError(
        context: StateContext<TickerStateModel>,
        action: SetTickerErrorAction): void {

        context.patchState({
            errors: action.payload
        });
    }

}
