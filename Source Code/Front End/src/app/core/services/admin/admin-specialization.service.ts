import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdminSpecializationService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) {

  }
  // #region 'Doctor'

  /**
  * Function will return specialization
  * @param requestData 
  */
   getSpecialization(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getSpecialization, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to create new specialization
   * @param requestData 
   * @returns 
   */
   createSpecialization(requestData: any) {
    return this.baseHttp.post(this.endpoint.createSpecialization, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to edit existing specialization
   * @param requestData 
   * @returns 
   */
   editSpecialization(requestData: any) {
    return this.baseHttp.put(this.endpoint.editSpecialization, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }


  /**
   * Method to delete existing specialization
   * @param requestData 
   * @returns 
   */
   deleteSpecialization(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deleteSpecialization + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
