import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetCityGroupCurrentWeatherAction } from '../forecasts-store/forecasts-store.actions';
import { transitions } from '@core/animations/animations';
import { ForecastsStoreState } from '../forecasts-store/forecasts-store.state';
import { Observable } from 'rxjs';
import { CityGroupCurrentWeatherModel } from '../forecasts-store/forecasts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.scss'],
  animations: [transitions],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastsListComponent implements OnInit {

  @Select(ForecastsStoreState.getGroupCityState)
  public cityGroup$: Observable<CityGroupCurrentWeatherModel>;

  constructor(
    private store: Store,
    private router: Router) { }

  ngOnInit() {
    const getAction = new GetCityGroupCurrentWeatherAction();
    this.store.dispatch(getAction);
  }

  public goToItemView(id): void {
    this.router.navigate([ '/forecasts/city/', id]);
  }
}
