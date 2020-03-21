import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  data(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const api = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?f=json&where=IdLandkreis%3D%2714713%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=ObjectId%2CAnzahlFall%2CMeldedatum&orderByFields=Meldedatum%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true';
    return this.httpClient.get(api).pipe(map(response => {
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
