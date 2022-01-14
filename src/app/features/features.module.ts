import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgChartsModule } from 'ng2-charts';

import { MaterialModule } from '../shared/material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class FeaturesModule { }
