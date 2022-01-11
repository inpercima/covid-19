import { DatePipe } from '@angular/common';
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

  pipe = new DatePipe('de-DE');

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.data('').subscribe((dataserie: any) => {
      this.cdGermany = this.prepareData(dataserie, 'Germany');
    });

    this.dataService.data(`AND (Bundesland='Sachsen')`).subscribe((dataserie: any) => {
      this.cdSaxony = this.prepareData(dataserie, 'Saxony');
    });

    this.dataService.data(`AND (IdLandkreis='14713')`).subscribe((dataserie: any) => {
      this.cdLeipzig = this.prepareData(dataserie, 'Leipzig');
    });
  }

  prepareData(dataserie: Map<string, number>, label: string): ChartConfiguration['data'] {
    const result: ChartConfiguration['data'] = {
      datasets: [{
        data: [],
        label: `Novel COVID-19 cases by date in ${label}`,
      }, {
        data: [],
        label: `Novel COVID-19 cases by date in ${label} cumultated`,
      }],
      labels: [],
    };
    let cumultatedCases = 0;
    for (let entry of dataserie.entries()) {
      result.datasets[0].data.push(entry[1]);
      ;
      result.datasets[1].data.push(cumultatedCases += entry[1]);
      result.labels!.push(this.pipe.transform(new Date(entry[0]), 'dd.MM.yyyy')!);
    }
    console.log(result);
    return result;
  }
}
