import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class GenericHttp {
  private readonly baseUrl: string;

    public constructor(public http: HttpClient) {
    this.baseUrl = "";
  }

  public Get<T>(endPoint: string, options?: { respType?: 'json', ignoreError?: boolean }): Observable<T> {
    options = options || {};
    return this.http.get<T>(endPoint, {
      headers: this.HeadersNoHandler(options.ignoreError),
      responseType: options.respType
    });
  }

  public Post<T>(endPoint: string, params: any, options?: { respType?: 'json', ignoreError?: boolean }): Observable<T> {
    options = options || {};
    return this.http.post<T>(this.prepareURL(endPoint), params,
      {
        headers: this.HeadersNoHandler(options.ignoreError),
        responseType: options.respType
      });
  }

  public Put<T>(endPoint: string, params: any, options?: { respType?: 'json', ignoreError?: boolean }): Observable<T> {
    options = options || {};
    return this.http.put<T>(endPoint, params, {
      headers: this.HeadersNoHandler(options.ignoreError),
      responseType: options.respType
    });
  }

  public Delete<T>(endPoint: string, options?: { respType?: 'json', ignoreError?: boolean }): Observable<T> {
    options = options || {};
    return this.http.delete<T>(this.prepareURL(endPoint), {
      headers: this.HeadersNoHandler(options.ignoreError),
      responseType: options.respType
    });
  }

  private prepareURL(endPoint: string): string {
    if (endPoint.indexOf('http') === -1) {
      endPoint = this.baseUrl + endPoint;
    }

    return endPoint;
  }




  private HeadersNoHandler(ignoreError = false): HttpHeaders {
    let headersNoHandler = new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    });

    if(ignoreError){
      headersNoHandler = headersNoHandler.append('X-Skip-ErrorHandler', 'true')
    }

    return headersNoHandler;
  }
}


