import { Injectable } from '@angular/core';
import { ProviderResponseModel } from 'src/app/shared/models/common/api-status';
import { throwError } from 'rxjs';
import { Messages } from '../../messages/messages';
import * as moment from 'moment';
import { Constants, ModuleConstants } from '../../constants/constants';
import { StorageProvider } from '../../http/storage-service';
@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {
  
  constructor( private storageProvider: StorageProvider) { }

  /**
   * Desc: Function called to extract server data
   * @param:response data
   */
  public extractData(res: any): any {
    if (res !== undefined || res !== null) {
      const data=JSON.parse(res);
      return this.getProviderResObj(data.status, data, data.ErrorMessage);
    } else {
      return this.getProviderResObj(false, res, Messages.Dialog_Message_Error);
    }
  }

  /**
   * Return API response in custom format
   * @param status api status
   * @param isUserConfirmationRequired api status for showing confirm dialog
   * @param data api data
   * @param message api message
   */
  public getProviderResObj(status: any, data?: any, message?: any): any {
    const provResponseObj: ProviderResponseModel = new ProviderResponseModel();
    provResponseObj.status = status;
    provResponseObj.data = data === undefined ? '' : data.Dataresult;
    provResponseObj.message = message === undefined ? '' : message;
    return provResponseObj;
  }

 /**
  * Desc: Function called to throw error
  * @param err error code
  */
  public catchError(err: any): any {

    // Not throw error if 401 (Unauthorized)
    // 401 is handled on interceptor
    // if (err.status !== 401) {
    //   if (err.name === 'TimeoutError') {
    //     this.eventService.publishEvent(Constants.ConnectionTimeoutErrorEvent, true);
    //   } else {
    //     this.loggingService.logException(err); // logging exception
    //     return throwError(err);
    //   }
    // }

    return true;
  }

  /**
   * Desc: Function called to catch error for fire and forgot api's
   * @param err error code
   */
  public catchFireForgotError(err: any): any {
    // Not throw error if 401 (Unauthorized)
    // 401 is handled on interceptor
    // if (err.status !== 401) {
    //   if (!(err.name === 'TimeoutError')) {
    //     this.loggingService.logException(err); // logging exception
    //     return throwError(err);
    //   }
    // }
  }

  /**
   * Method to convert date string to date object
   * @param dateStr input date string
   */
  convertStringToDate(dateStr:any) {
    if (dateStr != null) {
      return moment(dateStr).toDate();
    }
    return dateStr;
  }

  /**
   * Method will convert date event to date string
   * @param dateEvent date event from picker
   */
  convertStrDate(dateEvent:any) {
    if (dateEvent != null) {
      return moment(dateEvent).toISOString();
    }
    return dateEvent;
  }

  /**
   * Desc:Function to format date in YyyyMmDd format.
   * @param date :given date.
   */
   public formatDateToYyyyMmDd(date:any) {
    const d = new Date(date.getTime());
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  /**
   * Function will convert dateString to YyyyMmDd.
   * @param date : input date
   */
  public convertDateStringToYyyyMmDd(strDate: any): any {
    if (strDate != null && strDate !== '') {
      const date: any = new Date(strDate);
      let dd: any = date.getDate();
      let mm: any = date.getMonth() + 1;
      const yyyy = date.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      return [yyyy, mm, dd].join('-');
    }
    return strDate;
  }

  /**
   * Descp:Function to convert date string to mm/dd/yyyy format.
   * @param: str
   */
  convertStrToDateFormat(str: any) {
    if (str) {
      const date = new Date(str);
      const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return [mnth, day, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  


  /**
   * Function will return browser name
   */
  getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1:
        return 'opera';
      case agent.indexOf('chrome') > -1:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  /**
   * Return 'Y' or 'N' based on boolean input
   * @param data data for conversion
   */
   getStringValForBool(data: any): any {
    if (data) {
      return 'Y';
    }
    return 'N';
  }


 

  /**
   * Method to convert date to particular format
   * @param dateStr input date string
   * @param dateFormat output date format
   */
  convertStrDateToSpecificFormat(dateStr:any, dateFormat:any) {
    if (dateStr != null) {
      return moment(dateStr).format(dateFormat);
    }
    return dateStr;
  }

  /**
   * Description:Function will convert date to yyyy-mm-dd string.
   * @param inputDate date
   */
  public convertDateToYyyyMmDdString(inputDate: any): any {
    if (inputDate !== '') {
      let strDate: any = new Date(inputDate);
      let dd: any = strDate.getDate();
      let mm: any = strDate.getMonth() + 1;
      const yyyy = strDate.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      strDate = yyyy + '-' + mm + '-' + dd;
      return strDate;
    }
    return inputDate;
  }


  /**
   * Method to convert form group name to sentence case
   * @param keyName:current form control name
   * @returns name in sentence case
   */
     convertKeyToSentenceCase(keyName:any) {
      const result = keyName.replace(/([A-Z])/g, ' $1');
      const updatedText = result.charAt(0).toUpperCase() + result.slice(1);
      return updatedText;
    }
}
