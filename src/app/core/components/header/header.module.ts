import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { TickerComponent } from './ticker/ticker.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TickerComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
