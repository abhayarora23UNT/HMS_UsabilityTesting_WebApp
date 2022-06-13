import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class StaffPatientService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) {

  }
  // #region 'treatment'

  /**
  * Function will return Patient list
  * @param requestData 
  */
   getPatientsList(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getPatientsList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to create new patient
   * @param requestData 
   * @returns 
   */
   createPatientsList(requestData: any) {
    return this.baseHttp.post(this.endpoint.createPatientsList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to edit existing Patient
   * @param requestData 
   * @returns 
   */
   editPatientsList(requestData: any) {
    return this.baseHttp.put(this.endpoint.editPatientsList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }


  /**
   * Method to delete existing Patient
   * @param requestData 
   * @returns 
   */
   deletePatientsList(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deletePatientsList + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
