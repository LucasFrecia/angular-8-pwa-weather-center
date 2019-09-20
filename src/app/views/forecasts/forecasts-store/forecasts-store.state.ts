import {
  State,
  Action,
  Selector,
  StateContext,
  Store
} from '@ngxs/store';
import {
  GetCityCurrentWeatherAction,
  GetFiveDayForecastAction,
  GetCityCurrentWeatherSuccessAction,
  GetFiveDayForecastSuccessAction,
  SetErrorAction,
  GetCityGroupCurrentWeatherAction,
  GetCityGroupCurrentWeatherSuccessAction
} from './forecasts-store.actions';
import { AsyncEffectsHandler } from '@core/services/async-effects-handler.service';
import {
  CoreShowProgressBarAction,
  CoreHideProgressBarAction
} from '@core/core-store/core-store.actions';
import {
  catchError,
  tap
} from 'rxjs/operators';
import {
  ForecastStateModel,
  FiveDayForecastModel,
  CurrentWeatherCityItemModel,
  CityGroupCurrentWeatherModel
} from './forecasts.model';
import { ForecastsService } from '../forecasts.service';
import { Observable } from 'rxjs';
import { LandingStoreState } from 'app/views/landing/landing-store/landing-store.state';
import { ResetSelectedIds } from 'app/views/landing/landing-store/landing-store.actions';

const FEATURE_ID = 'forecastsStore';

@State<ForecastStateModel>({
  name: FEATURE_ID,
  defaults: {
    selectedCityForecast: null,
    selectedCityCurrentWeather: null,
    groupCityCurrentWeather: null,
    errors: null
  }
})

export class ForecastsStoreState {

  constructor(
    private service: ForecastsService,
    private asyncEffectsService: AsyncEffectsHandler,
    private store: Store) {

    const dispatchedHandledActions = [
      GetCityCurrentWeatherAction,
      GetFiveDayForecastAction,
      GetCityGroupCurrentWeatherAction
    ];

    const completedHandledActions = [
      GetCityCurrentWeatherSuccessAction,
      GetFiveDayForecastSuccessAction,
      GetCityGroupCurrentWeatherSuccessAction
    ];

    this.asyncEffectsService.setActionsEffect(
      dispatchedHandledActions,
      new CoreShowProgressBarAction(),
      'Dispatched'
    );

    this.asyncEffectsService.setActionsEffect(
      completedHandledActions,
      new CoreHideProgressBarAction(),
      'Completed'
    );
  }

  @Selector()
  public static getGroupCityState(
    state: ForecastStateModel
  ): CityGroupCurrentWeatherModel {
    return state.groupCityCurrentWeather;
  }

  @Selector()
  public static getSelectedCityState(
    state: ForecastStateModel
  ): CurrentWeatherCityItemModel {
    return state.selectedCityCurrentWeather;
  }

  @Selector()
  public static getSelectedCityForecastState(
    state: ForecastStateModel
  ): FiveDayForecastModel {
    return state.selectedCityForecast;
  }

  @Action(
    GetCityCurrentWeatherAction,
    { cancelUncompleted: true } // cancelUncompleted works like switchMap, and will cancel async actions for ex if a new one is dispatched
  )
  public getList(
    context: StateContext<ForecastStateModel>,
    action: GetCityCurrentWeatherAction
  ): Observable<CurrentWeatherCityItemModel> {

    const cityId = action.payload; // `${action.payload.city},${action.payload.country}`;

    return this.service
      .getCityCurrentWeather(cityId)
      .pipe(
        tap(data => this.store.dispatch(new GetCityCurrentWeatherSuccessAction(data))),
        catchError(errors => this.store.dispatch(new SetErrorAction(errors)))
      );
  }

  @Action(GetCityCurrentWeatherSuccessAction)
  public getListSucces(
    context: StateContext<ForecastStateModel>,
    action: GetCityCurrentWeatherSuccessAction
  ): any {

    context.patchState({
      selectedCityCurrentWeather: action.payload
    });
  }

  @Action(
    GetFiveDayForecastAction,
    { cancelUncompleted: true }
  )
  public getForecast(
    context: StateContext<ForecastStateModel>,
    action: GetFiveDayForecastAction
  ): Observable<FiveDayForecastModel> {

    const cityId = action.payload; // `${action.payload.city},${action.payload.country}`;

    return this.service
      .getForecast(cityId)
      .pipe(
        tap(data => this.store.dispatch(new GetFiveDayForecastSuccessAction(data))),
        catchError(errors => this.store.dispatch(new SetErrorAction(errors)))
      );
  }

  @Action(GetFiveDayForecastSuccessAction)
  public getForecastSuccess(
    context: StateContext<ForecastStateModel>,
    action: GetFiveDayForecastSuccessAction
  ): any {

    context.patchState({
      selectedCityForecast: action.payload
    });
  }

  @Action(
    GetCityGroupCurrentWeatherAction,
    { cancelUncompleted: true }
  )
  public getCityGroupCurrent(
    context: StateContext<ForecastStateModel>,
    action: GetCityGroupCurrentWeatherAction
  ): Observable<CityGroupCurrentWeatherModel> {

    /** Access landing store to get selected Ids */
    const cityIds = this.store.selectSnapshot(LandingStoreState.getSelectedIds).join();

    return this.service
      .getMultipleCityCurrentWeather(cityIds)
      .pipe(
        tap(data => this.store.dispatch(new GetCityGroupCurrentWeatherSuccessAction(data))),
        catchError(errors => this.store.dispatch(new SetErrorAction(errors)))
      );
  }

  @Action(GetCityGroupCurrentWeatherSuccessAction)
  public getCityGroupCurrentSuccess(
    context: StateContext<ForecastStateModel>,
    action: GetCityGroupCurrentWeatherSuccessAction
  ): any {

    context.patchState({
      groupCityCurrentWeather: action.payload
    });

    const clearSelectedIds = new ResetSelectedIds();
    this.store.dispatch(clearSelectedIds);
  }

  @Action(SetErrorAction)
  public setError(
    context: StateContext<ForecastStateModel>,
    action: SetErrorAction): void {

    context.patchState({
      errors: action.payload
    });
  }

}
