import { Component, OnInit } from '@angular/core';

import { ChartConfiguration } from 'chart.js';

import { DataService } from './data.service';

@Component({
  selector: 'covid-dashboard',
  templateUrl: './dashboard.component.html',
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
    this.dataService.createDate('', 'Germany').subscribe((dataserie: any) => this.cdGermany = dataserie);
    this.dataService.createDate(`AND (Bundesland='Sachsen')`, 'Saxony').subscribe((dataserie: any) => this.cdSaxony = dataserie);
    this.dataService.createDate(`AND (IdLandkreis='14713')`, 'Leipzig').subscribe((dataserie: any) => this.cdLeipzig = dataserie);
  }
}
