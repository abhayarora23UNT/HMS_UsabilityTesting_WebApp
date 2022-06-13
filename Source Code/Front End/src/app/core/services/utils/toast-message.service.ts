import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class ToastMessageService {

    toastStyleClass='toast-custom';
    private toastr: ToastrService;
    constructor(private toasterService1: ToastrService) {
        this.toastr = toasterService1;
    }

    /**
     * Method to show success toast message
     * @param message: custome message 
     * @param timeOutVal:custome timeoutval 
     */
    successMessage(message: string, timeOutVal?: number) {
        const title = '';
        let defaultTimeout = Constants.DefaultToastTimeout;
        if (timeOutVal) {
            defaultTimeout = timeOutVal;
        }
        this.toastr.success(message, title, {
            timeOut: defaultTimeout,
            closeButton:true,
            positionClass:this.toastStyleClass
        });
    }

    /**
     * Method to show error toast message
     * @param message: custome message 
     * @param timeOutVal:custome timeoutval 
     */
    errorMessage(message: string, timeOutVal?: number) {
        const title = '';
        let defaultTimeout = Constants.DefaultToastTimeout;
        if (timeOutVal) {
            defaultTimeout = timeOutVal;
        }
        this.toastr.error(message, title, {
            timeOut: defaultTimeout,
            positionClass:this.toastStyleClass
        });
    }

    /**
     * Method to show warning toast message
     * @param message: custome message 
     * @param timeOutVal:custome timeoutval 
     */
    warningMessage(message: string, timeOutVal?: number) {
        const title = '';
        let defaultTimeout = Constants.DefaultToastTimeout;
        if (timeOutVal) {
            defaultTimeout = timeOutVal;
        }
        this.toastr.warning(message, title, {
            timeOut: defaultTimeout,
            closeButton:true,
            positionClass:this.toastStyleClass
        });
    }

    /**
     * Method to show info toast message
     * @param message: custome message 
     * @param timeOutVal:custome timeoutval 
     */
    infoMessage(message: string, timeOutVal?: number) {
        if(!this.toastr.currentlyActive){
            const title = '';
            let defaultTimeout = Constants.DefaultToastTimeout;
            if (timeOutVal) {
                defaultTimeout = timeOutVal;
            }
            this.toastr.info(message, title, {
                timeOut: defaultTimeout,
                closeButton:true,
                positionClass:this.toastStyleClass
            });
        }
     
    }

}

