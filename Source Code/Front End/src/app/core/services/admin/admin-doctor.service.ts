import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDoctorService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) {

  }
  // #region 'Doctor'

  /**
  * Function will return doctor list
  * @param requestData 
  */
   getDoctorsList(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getDoctorsList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to create new doctor
   * @param requestData 
   * @returns 
   */
   createDoctorsList(requestData: any) {
    return this.baseHttp.post(this.endpoint.createDoctorsList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to edit existing doctor
   * @param requestData 
   * @returns 
   */
   editDoctorsList(requestData: any) {
    return this.baseHttp.put(this.endpoint.editDoctorsList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }


  /**
   * Method to delete existing doctor
   * @param requestData 
   * @returns 
   */
   deleteDoctorsList(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deleteDoctorsList + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
