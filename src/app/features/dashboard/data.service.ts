import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  data(region: string): Observable<any> {
    const baseUrl = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/';
    const extraParameters = '&outFields=AnzahlFall,Meldedatum&orderByFields=Meldedatum asc&resultType=standard';
    return this.httpClient.get(`${baseUrl}query?f=json&where=${region}${extraParameters}`).pipe(map(response => {
      const result = new Map();
      // tslint:disable-next-line: no-string-literal
      response['features'].forEach(element => {
        const date = element.attributes.Meldedatum;
        if (result.has(date)) {
          result.set(date, result.get(date) + element.attributes.AnzahlFall);
        } else {
          result.set(date, element.attributes.AnzahlFall);
        }
      });
      return result;
    }));
  }
}
