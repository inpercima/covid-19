import { Component, OnInit } from '@angular/core';

import { ChartConfiguration } from 'chart.js';

import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { DataService } from './data.service';

@Component({
  selector: 'covid-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [MatCardModule, NgIf, NgChartsModule],
})
export class DashboardComponent implements OnInit {
  chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };
  cdGermany = this.chartData;
  cdSaxony = this.chartData;
  cdLeipzig = this.chartData;

  chartOptions = {
    responsive: true,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.createDate('', 'Germany').subscribe((dataserie: ChartConfiguration['data']) => (this.cdGermany = dataserie));
    this.dataService.createDate(`AND (Bundesland='Sachsen')`, 'Saxony').subscribe((dataserie: ChartConfiguration['data']) => (this.cdSaxony = dataserie));
    this.dataService.createDate(`AND (IdLandkreis='14713')`, 'Leipzig').subscribe((dataserie: ChartConfiguration['data']) => (this.cdLeipzig = dataserie));
  }
}
