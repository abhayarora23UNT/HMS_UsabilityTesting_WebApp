import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
    providedIn: 'root'
})
export class PatientService {


    constructor(private baseHttp: BaseHttpService,
        private endpoint: EndPointService,
        private commonUtilsProvider: CommonUtilsService) {

    }


    // #region 'appointment'

    /**
     * Function will return doctor appointment list
     * @param requestData payload for register user api
     */
    getPatientAppointmentList(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.getDocAppointmentList, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Method to create new appointment for doctor
     * @param requestData 
     * @returns 
     */
    createPatientAppointment(requestData: any) {
        return this.baseHttp.post(this.endpoint.createDocAppointment, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Method to edit existing appointment for doctor
     * @param requestData 
     * @returns 
     */
    editPatientAppointment(requestData: any) {
        return this.baseHttp.put(this.endpoint.editDocAppointment, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }


    /**
     * Method to delete existing appointment for doctor
     * @param requestData 
     * @returns 
     */
    deletePatientAppointment(requestData: any) {
        return this.baseHttp.delete(this.endpoint.deleteDocAppointment + '/' + requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    // #endregion 'appointment'

    // #region 'appointmentmedicine'

    /**
    * Function will return appointment medicine list
    * @param requestData payload for register user api
    */
    getAppointmentMedicineList(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.getAppointmentMedicineList, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    // #endregion 'appointmentmedicine'


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
}
