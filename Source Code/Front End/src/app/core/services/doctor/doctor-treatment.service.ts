import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
    providedIn: 'root'
})
export class TreatmentService {


    constructor(private baseHttp: BaseHttpService,
        private endpoint: EndPointService,
        private commonUtilsProvider: CommonUtilsService) {

    }


    

    // #region 'treatment'

     /**
     * Function will return treatment list
     * @param requestData 
     */
      getTreatmentMedicineList(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.getTreatmentMedicineList, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Method to create new treatment medicine
     * @param requestData 
     * @returns 
     */
    createTreatmentMedicine(requestData: any) {
        return this.baseHttp.post(this.endpoint.createTreatmentMedicine, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Method to edit existing treatment medicine
     * @param requestData 
     * @returns 
     */
    editTreatmentMedicine(requestData: any) {
        return this.baseHttp.put(this.endpoint.editTreatmentMedicine, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }


    /**
     * Method to delete existing treatment medicine
     * @param requestData 
     * @returns 
     */
    deleteTreatmentMedicine(requestData: any) {
        return this.baseHttp.delete(this.endpoint.deleteTreatmentMedicine+'/'+requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }
    // #endregion 'treatment'
}
