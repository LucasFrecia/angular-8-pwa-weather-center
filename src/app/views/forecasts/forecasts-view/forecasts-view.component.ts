import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GetCityCurrentWeatherAction,
  GetFiveDayForecastAction
} from '../forecasts-store/forecasts-store.actions';
import {
  Store,
  Select
} from '@ngxs/store';
import { Observable } from 'rxjs';
import { ForecastsStoreState } from '../forecasts-store/forecasts-store.state';
import {
  CurrentWeatherCityItemModel,
  FiveDayForecastModel
} from '../forecasts-store/forecasts.model';
import { transitions } from '@core/animations/animations';
import { StateReset } from 'ngxs-reset-plugin';

@Component({
  selector: 'app-forecasts-view',
  templateUrl: './forecasts-view.component.html',
  styleUrls: ['./forecasts-view.component.scss'],
  animations: [transitions],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ForecastsViewComponent implements OnInit, OnDestroy {

  @Select(ForecastsStoreState.getSelectedCityState)
  public selectedCity$: Observable<CurrentWeatherCityItemModel>;

  @Select(ForecastsStoreState.getSelectedCityForecastState)
  public selectedCityForecast$: Observable<FiveDayForecastModel>;

  private cityId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.cityId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    const getActions = [
      new GetCityCurrentWeatherAction(this.cityId),
      new GetFiveDayForecastAction(this.cityId)
    ];

    this.store.dispatch(getActions);
  }

  ngOnDestroy(): void {
    /** Reset the state when component is destroyed */
    const resetPriorSelection = new StateReset(ForecastsStoreState);
    this.store.dispatch(resetPriorSelection);
  }

}
