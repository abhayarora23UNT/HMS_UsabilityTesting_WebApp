import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class StaffMedicineService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) {

  }
  // #region 'Doctor'

  /**
  * Function will return doctor list
  * @param requestData 
  */
   getMedicinesList(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getMedicinesList, requestData)
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
   createMedicinesList(requestData: any) {
    return this.baseHttp.post(this.endpoint.createMedicinesList, requestData)
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
   editMedicinesList(requestData: any) {
    return this.baseHttp.put(this.endpoint.editMedicinesList, requestData)
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
   deleteMedicinesList(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deleteMedicinesList + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
