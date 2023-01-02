import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pipe = new DatePipe('de-DE');

  constructor(private http: HttpClient) { }

  createDate(region: string, label: string): Observable<ChartConfiguration['data']> {
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

    return this.loadData(region).pipe(
      map(response => {
        for (const entry of response.entries()) {
          result.datasets[0].data.push(entry[1]);
          result.datasets[1].data.push(cumultatedCases += entry[1]);
          result.labels!.push(this.pipe.transform(new Date(entry[0]), 'dd.MM.yyyy')!);
        }
        return result;
      })
    )
  }

  loadData(region: string): Observable<Map<string, number>> {
    const result = new Map<string, number>();
    return this.loadDataFromArcgis(region).pipe(
      map(response => {
        response.features.forEach((element: any) => {
          const attributes = element.attributes;
          result.set(attributes.Meldedatum, attributes.AnzahlFaelle);
        });
        return result;
      }),
    );
  }

  loadDataFromArcgis(region: string): Observable<any> {
    return this.http.get('https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/Covid19_RKI_Sums/FeatureServer/0/query', {
      params: {
        f: 'json',
        where: `AnzahlFall > 0 ${region}`,
        outFields: 'AnzahlFall,Meldedatum',
        groupByFieldsForStatistics: 'Meldedatum',
        outStatistics: '[{"statisticType": "sum", "onStatisticField": "AnzahlFall", "outStatisticFieldName": "AnzahlFaelle"}]',
        orderByFields: 'Meldedatum',
        resultType: 'standard',
      }
    });
  }
}
