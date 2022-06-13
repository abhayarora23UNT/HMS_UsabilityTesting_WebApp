import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';


declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class ConfigDataProvider {

  public apiEndPoint: string;
 
  constructor() {
    this.apiEndPoint = '';
  }

  /**
   * Function will return header object
   */
  getCommonHeaderOptions() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
      , responseType: 'text' as 'text'
    };
    return httpOptions;
  }
}
