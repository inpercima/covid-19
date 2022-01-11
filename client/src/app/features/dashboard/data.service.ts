import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  data(region: string): Observable<Map<string, number>> {
    const result = new Map<string, number>();
    return this.request(region).pipe(
      map(response => {
        response.features.forEach((element: any) => {
          const attributes = element.attributes;
          result.set(attributes.Meldedatum, attributes.AnzahlFaelle);
        });
        return result;
      }),
    );
  }

  request(region: string): Observable<any> {
    return this.http.get('https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/RKI_COVID19/FeatureServer/0/query', {
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
