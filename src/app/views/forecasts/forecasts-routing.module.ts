import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE } from '@core/core.config';
import { AsyncEffectsHandler } from '@core/services/async-effects-handler.service';
import { ForecastsViewComponent } from './forecasts-view/forecasts-view.component';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ForecastsListComponent
  },
  {
    path: 'city/:id',
    component: ForecastsViewComponent
  },
  APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AsyncEffectsHandler]
})
export class ForecastsRoutingModule { }
