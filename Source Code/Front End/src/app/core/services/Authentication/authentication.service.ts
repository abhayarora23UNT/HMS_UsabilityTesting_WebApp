import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor(private baseHttp: BaseHttpService,
        private endpoint: EndPointService,
        private commonUtilsProvider: CommonUtilsService) {

    }


    /**
     * Function will register new user to system
     * @param requestData payload for register user api
     */
    registerNewUser(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.registerUser, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    loginExistingUser(requestData:any){
        return this.baseHttp.post(this.endpoint.loginUser, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }
}
