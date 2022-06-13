import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdminTreatmentService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) {

  }
  // #region 'Doctor'

  /**
  * Function will return treatment list
  * @param requestData 
  */
   getTreatmentList(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getTreatmentList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to create new treatment
   * @param requestData 
   * @returns 
   */
   createTreatmentList(requestData: any) {
    return this.baseHttp.post(this.endpoint.createTreatmentList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to edit existing Treatment
   * @param requestData 
   * @returns 
   */
   editTreatmentList(requestData: any) {
    return this.baseHttp.put(this.endpoint.editTreatmentList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }


  /**
   * Method to delete existing treatment
   * @param requestData 
   * @returns 
   */
   deleteTreatmentList(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deleteTreatmentList + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
