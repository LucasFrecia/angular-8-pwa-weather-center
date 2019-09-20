import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE } from '@core/core.config';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'forecasts',
    loadChildren: () => import('./views/forecasts/forecasts.module').then(m => m.ForecastsModule)
  },
  APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { scrollPositionRestoration: 'top', preloadingStrategy: PreloadAllModules }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
