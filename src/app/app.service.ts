import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { URL_CONFIG } from './app.config';


@Injectable()
export class CloudOSAAppService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getTokenHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getDataForSingleInstance() {
    return this.http
      .get<any>(URL_CONFIG.BASE_URL + URL_CONFIG.TRACE, this.getTokenHeaders())
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>('getDataForSingleInstance'))
      );
  }

  getDataForQuery(data) {
    return this.http
      .post<any>(URL_CONFIG.BASE_URL + URL_CONFIG.QUERY, data, this.getTokenHeaders())
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>('getDataForQuery'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
