import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigDataProvider } from '../services/utils/config-data.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  // Pass header parameters
  httpRequestOptions =  {
    headers: new HttpHeaders({ })
  };

  constructor(private httpClient: HttpClient, protected apiConfig: ConfigDataProvider, ) { }
   // baseUrl: string = 'http://192.168.254.35:8087/';
   //baseUrl: string = 'http://172.20.1.28:8087/';
   // baseUrl: string = 'http://10.125.235.84:8087/'; 
    baseUrl: string = 'http://localhost:58853/';
  // baseUrl: string = 'https://unt-hms-api.azurewebsites.net/';
  // baseUrl: string = 'http://127.0.0.1:8080/';
  /**
   * Function used for HTTP get
   * @param relativeUrl API endpoint
   * @param options Optional parameters
   */
  public get<T, OT = any>(relativeUrl: string, options?: OT) {
    if (options) {
      return this.httpClient.get<T>(`${this.baseUrl}${relativeUrl}`, options );
    } else {
      return this.httpClient.get<T>(`${this.baseUrl}${relativeUrl}` );
    }
  }

  /**
   * Function used for HTTP get post
   * @param relativeUrl API endpoint
   * @param data Data object
   * @param options Optional parameters
   */
  public post<T, OT = any>(relativeUrl: string, data: T, options?: OT) {
    if (options ) {
      return this.httpClient.post<T>(`${this.baseUrl}${relativeUrl}`, data, options);
    } else {
      return this.httpClient.post<T>(`${this.baseUrl}${relativeUrl}`, data);
    }
  }

  /**
   * Function used for HTTP put
   * @param relativeUrl API endpoint
   * @param data Data object
   * @param options Optional parameters
   */
  public put<T, OT = any>(relativeUrl: string, data?: T, options?: OT) {
    if (options ) {
      return this.httpClient.put<T>(`${this.baseUrl}${relativeUrl}`, data, options);
    } else {
      return this.httpClient.put<T>(`${this.baseUrl}${relativeUrl}`, data);
    }
  }

  /**
   * Function used for HTTP delete
   * @param relativeUrl: API endpoint
   * @param options: Optional parameters
   */
  public delete<T, OT = any>(relativeUrl: string, options?: OT) {

    if (options) {
      return this.httpClient.delete<T>(`${this.baseUrl}${relativeUrl}`, options );
    } else {
      return this.httpClient.delete<T>(`${this.baseUrl}${relativeUrl}` );
    }
  }
}
