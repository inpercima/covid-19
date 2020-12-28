import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { expand, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  data(region: string): Observable<Map<string, number>> {
    let offset = 0;
    const result = new Map<string, number>();
    return this.request(region, offset).pipe(
      expand(response => response && response.features.length === 2000 ? this.request(region, offset += 2000) : EMPTY),
      map(response => {
        response.features.forEach((element: { attributes: any; }) => {
          const attributes = element.attributes;
          const date = attributes.Meldedatum;
          const count = attributes.AnzahlFall;
          result.set(date, result.has(date) ? result.get(date) + count : count);
        });
        return result;
      }),
    );
  }

  request(region: string, offset: number): Observable<any> {
    return this.httpClient.get('https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/RKI_COVID19/FeatureServer/0/query', {
      params: {
        f: 'json',
        where: `(Meldedatum > timestamp \'2020-01-25 22:59:59\' AND NeuerFall IN(0, 1)) ${region}`,
        outFields: 'AnzahlFall,Meldedatum',
        orderByFields: 'Meldedatum asc',
        resultType: 'standard',
        resultRecordCount: String(2000),
        resultOffset: String(offset)
      }
    });
  }
}
