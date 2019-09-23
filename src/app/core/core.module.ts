import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { CoreState } from './core-store/core-store.state';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environment/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { HeaderModule } from './modules/header/header.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

const modules = [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    HeaderModule,
    MatProgressBarModule,
    AppRoutingModule
];

@NgModule({
  imports: [
    modules,

    // Development mode set to true since this is a test project
    NgxsModule.forRoot([CoreState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false }),
    NgxsModule.forRoot([CoreState], { developmentMode: !environment.production }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    modules
  ]
})
export class CoreModule { }
