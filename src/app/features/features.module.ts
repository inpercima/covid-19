import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    ChartsModule,
    MatCardModule,
    FlexLayoutModule
  ], exports: [ DashboardComponent ]
})
export class FeaturesModule { }
