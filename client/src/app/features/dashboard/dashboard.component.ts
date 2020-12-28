import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';

import { DataService } from './data.service';

@Component({
  selector: 'covid-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  chartDataGermany: ChartDataSets[] = [];
  chartDataSaxony: ChartDataSets[] = [];
  chartDataLeipzig: ChartDataSets[] = [];

  chartLabelsGermany: Label[] = [];
  chartLabelsSaxony: Label[] = [];
  chartLabelsLeipzig: Label[] = [];

  chartOptions = {
    responsive: true,
  };

  pipe = new DatePipe('de-DE');

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    forkJoin([this.dataService.data('')]).subscribe(response => {
      const data = this.prepareData(response, 'Germany');
      this.chartDataGermany = data.get('data') as ChartDataSets[];
      this.chartLabelsGermany = data.get('labels') as Label[];
    });

    forkJoin([this.dataService.data(`AND (Bundesland='Sachsen')`)]).subscribe(response => {
      const data = this.prepareData(response, 'Saxony');
      this.chartDataSaxony = data.get('data') as ChartDataSets[];
      this.chartLabelsSaxony = data.get('labels') as Label[];
    });

    forkJoin([this.dataService.data(`AND (IdLandkreis='14713')`)]).subscribe(response => {
      const data = this.prepareData(response, 'Leipzig');
      this.chartDataLeipzig = data.get('data') as ChartDataSets[];
      this.chartLabelsLeipzig = data.get('labels') as Label[];
    });
  }

  prepareData(response: Map<string, number>[], label: string): Map<string, object> {
    const cases: number[] = [];
    const cumultatedCases: number[] = [];
    const labels: Label[] = [];

    const result = new Map<string, object>();
    response.forEach(entries => {
      for (const entry of entries) {
        labels.push(this.pipe.transform(new Date(entry[0]), 'dd.MM.yyyy') as Label);
        cases.push(entry[1]);
        cumultatedCases.push(!cumultatedCases.length ? entry[1] : cumultatedCases[cumultatedCases.length - 1] + entry[1]);
      }
      const dataLabel = `Novel COVID-19 cases by date in ${label}`;
      result.set('data', [{ data: cases, label: dataLabel }, { data: cumultatedCases, label: `${dataLabel} cumulated` }]);
      result.set('labels', labels);
    });
    return result;
  }
}
