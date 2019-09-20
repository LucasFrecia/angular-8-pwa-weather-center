import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ForecastsStoreState } from 'app/views/forecasts/forecasts-store/forecasts-store.state';
import { Observable } from 'rxjs';
import { CityGroupCurrentWeatherModel } from 'app/views/forecasts/forecasts-store/forecasts.model';
import { GetCityGroupCurrentWeatherAction } from 'app/views/forecasts/forecasts-store/forecasts-store.actions';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerComponent implements OnInit {

  @Select(ForecastsStoreState.getGroupCityState)
  public cityGroup$: Observable<CityGroupCurrentWeatherModel>;

  constructor(private store: Store) { }

  ngOnInit() {
    const getAction = new GetCityGroupCurrentWeatherAction();
    this.store.dispatch(getAction);
  }

}
