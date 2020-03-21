import { Component, OnInit } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { DataService } from './data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'covid-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lineChartDataG: ChartDataSets[];

  lineChartLabelsG: Label[];

  lineChartDataS: ChartDataSets[];

  lineChartLabelsS: Label[];

  lineChartDataL: ChartDataSets[];

  lineChartLabelsL: Label[];

  pipe = new DatePipe('de-DE');

  lineChartOptions = {
    responsive: true,
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.data('1=1').subscribe(response => {
      const tempDataNew: any[] = [];
      const tempDataAll: any[] = [];
      const tempLabel: any[] = [];
      let all = 0;
      for (const entry of response.entries()) {
        tempDataNew.push(entry[1]);
        tempLabel.push(this.pipe.transform(new Date(entry[0]), 'dd.MM.yyyy'));
        if (!tempDataAll.length) {
          tempDataAll.push(entry[1]);
          all = entry[1];
        } else {
          all += entry[1];
          tempDataAll.push(all);
        }
      }
      this.lineChartDataG = [
        { data: tempDataNew, label: 'Novel COVID-19 cases by date in Germany' },
        { data: tempDataAll, label: 'Novel COVID-19 cases by date in Germany cumulated' },
      ];
      this.lineChartLabelsG = tempLabel;
    });

    this.dataService.data(`Bundesland='Sachsen'`).subscribe(response => {
      const tempDataNew: any[] = [];
      const tempDataAll: any[] = [];
      const tempLabel: any[] = [];
      let all = 0;
      for (const entry of response.entries()) {
        tempDataNew.push(entry[1]);
        tempLabel.push(this.pipe.transform(new Date(entry[0]), 'dd.MM.yyyy'));
        if (!tempDataAll.length) {
          tempDataAll.push(entry[1]);
          all = entry[1];
        } else {
          all += entry[1];
          tempDataAll.push(all);
        }
      }
      this.lineChartDataS = [
        { data: tempDataNew, label: 'Novel COVID-19 cases by date in Saxony' },
        { data: tempDataAll, label: 'Novel COVID-19 cases by date in Saxony cumulated' },
      ];
      this.lineChartLabelsS = tempLabel;
    });

    this.dataService.data(`IdLandkreis='14713'`).subscribe(response => {
      const tempDataNew: any[] = [];
      const tempDataAll: any[] = [];
      const tempLabel: any[] = [];
      let all = 0;
      for (const entry of response.entries()) {
        tempDataNew.push(entry[1]);
        tempLabel.push(this.pipe.transform(new Date(entry[0]), 'dd.MM.yyyy'));
        if (!tempDataAll.length) {
          tempDataAll.push(entry[1]);
          all = entry[1];
        } else {
          all += entry[1];
          tempDataAll.push(all);
        }
      }
      this.lineChartDataL = [
        { data: tempDataNew, label: 'Novel COVID-19 cases by date in Leipzig' },
        { data: tempDataAll, label: 'Novel COVID-19 cases by date in Leipzig cumulated' },
      ];
      this.lineChartLabelsL = tempLabel;
    });
  }
}
