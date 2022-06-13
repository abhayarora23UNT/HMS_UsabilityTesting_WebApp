import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';
@Injectable({
  providedIn: 'root'
})
export class AdminOperativeRoomService {

  constructor(private baseHttp: BaseHttpService,
    private endpoint: EndPointService,
    private commonUtilsProvider: CommonUtilsService) { }

    // #region 'Operative-Room'

  /**
  * Function will return operative-room list
  * @param requestData 
  */
   getOperativeRoomList(requestData: any): Observable<any> {
    return this.baseHttp.post(this.endpoint.getOperativeRoomList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to create new operative-room
   * @param requestData 
   * @returns 
   */
   createOperativeRoomList(requestData: any) {
    return this.baseHttp.post(this.endpoint.createOperativeRoomList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }

  /**
   * Method to edit existing operative-room
   * @param requestData 
   * @returns 
   */
   editOperativeRoomList(requestData: any) {
    return this.baseHttp.put(this.endpoint.editOperativeRoomList, requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }


  /**
   * Method to delete existing operative-room
   * @param requestData 
   * @returns 
   */
   deleteOperativeRoomList(requestData: any) {
    return this.baseHttp.delete(this.endpoint.deleteOperativeRoomList + '/' + requestData)
      .pipe(
        timeout(ModuleConstants.apiTimeout),
        map((res) => this.commonUtilsProvider.extractData(res)),
        catchError((err) => this.commonUtilsProvider.catchError(err))
      );
  }
}
