import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '@shared/*';
import { LandingStoreState } from './landing-store/landing-store.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LandingRoutingModule,
    NgxsFormPluginModule,
    NgxsModule.forFeature([
      LandingStoreState
    ]),
  ]
})
export class LandingModule { }
