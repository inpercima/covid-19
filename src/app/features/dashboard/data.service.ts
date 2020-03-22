import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  data(region: string): Observable<Map<string, number>> {
    const baseUrl = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/';
    const parameters = '&outFields=AnzahlFall,Meldedatum&orderByFields=Meldedatum asc&resultType=standard';
    return this.httpClient.get(`${baseUrl}query?f=json&where=${region}${parameters}`).pipe(map(response => {
      const result = new Map<string, number>();
      // tslint:disable-next-line: no-string-literal
      response['features'].forEach(element => {
        const attributes = element.attributes;
        const date = attributes.Meldedatum;
        const count = attributes.AnzahlFall;
        result.set(date, result.has(date) ? result.get(date) + count : count);
      });
      return result;
    }));
  }
}
