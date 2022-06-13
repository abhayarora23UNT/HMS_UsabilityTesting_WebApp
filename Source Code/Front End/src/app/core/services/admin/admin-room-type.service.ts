import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoomTypeService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) {

  }
  // #region 'Doctor'

  /**
  * Function will return doctor list
  * @param requestData 
  */
   getRoomTypeList(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getRoomTypeList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to create room type
   * @param requestData 
   * @returns 
   */
   createRoomTypeList(requestData: any) {
    return this.baseHttp.post(this.endpoint.createRoomTypeList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to edit existing room type
   * @param requestData 
   * @returns 
   */
   editRoomTypeList(requestData: any) {
    return this.baseHttp.put(this.endpoint.editRoomTypeList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }


  /**
   * Method to delete existing room type
   * @param requestData 
   * @returns 
   */
   deleteRoomTypeList(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deleteRoomTypeList + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
