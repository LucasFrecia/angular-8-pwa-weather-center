import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { TickerComponent } from './ticker/ticker.component';
import { TickerStoreState } from './ticker/ticker-store/ticker-store.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    HeaderComponent,
    TickerComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    NgxsModule.forFeature([
      TickerStoreState
    ]),
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
