import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

/** Material Modules */
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { WindDirectionPipe } from '@core/pipes/wind-direction.pipe';
import { CommonModule } from '@angular/common';

const modules = [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatProgressBarModule
];

@NgModule({
  declarations: [WindDirectionPipe],
  imports: [
    modules
  ],
  exports: [
    modules,
    WindDirectionPipe
  ]
})
export class SharedModule { }
