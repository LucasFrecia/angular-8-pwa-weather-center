import { NgModule } from '@angular/core';

import { ForecastsRoutingModule } from './forecasts-routing.module';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { ForecastsViewComponent } from './forecasts-view/forecasts-view.component';
import { SharedModule } from '@shared/*';
import { ForecastsStoreState } from './forecasts-store/forecasts-store.state';
import { NgxsModule } from '@ngxs/store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CurrentWeatherItemComponent } from './components/current-weather-item/current-weather-item.component';

@NgModule({
  declarations: [
    ForecastsListComponent,
    ForecastsViewComponent,
    CurrentWeatherItemComponent
  ],
  imports: [
    ForecastsRoutingModule,
    SharedModule,
    ScrollingModule,
    NgxsModule.forFeature([
      ForecastsStoreState
    ])
  ]
})
export class ForecastsModule { }
