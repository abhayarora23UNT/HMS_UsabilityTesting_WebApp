import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Constants } from '../constants/constants';
import { Messages } from '../messages/messages';


declare var MiniProfiler: any;
@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor( private ngZone: NgZone) {
  }
  errorDialogRef: any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(
      (response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          
        }
      },
      (error: HttpErrorResponse) => {
        let errorMessage = '';
        // if (error.status === 401) {
        //   //this.eventService.publishEvent(Constants.UnauthorizedAccessEvent, true);
        // } else {
        //   this.showHttpErrorDialog(error);
        // }
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }
    ));
  }

}
