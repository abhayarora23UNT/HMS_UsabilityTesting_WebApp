import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { AuthenticationService } from 'src/app/core/services/Authentication/authentication.service';
import { Messages } from 'src/app/core/messages/messages';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { Router } from '@angular/router';
import { StorageProvider } from 'src/app/core/http/storage-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  fgLogin!: FormGroup;
  private onDestroy$: Subject<void> = new Subject<void>();
  isDataLoading = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private toastService: ToastMessageService, private router: Router, private storageService: StorageProvider) {
    this.createLoginFormGroup();
  }

  /**
   * Method to create initial form group
   */
  createLoginFormGroup() {
    this.fgLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Method called on page Init
   */
  ngOnInit(): void {
  }

  /**
   * Method called on page destroy
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method called, when logi in button is clicked
   */
  loginUser() {
    if (this.fgLogin.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const formData = this.fgLogin.value;
      const obj = {
        Email: formData.userName,
        Password: formData.password,
      }
      this.callLoginUserApi(obj);
    }
  }


  /**
  * Method to called login user api
  * @param requestData 
  */
  callLoginUserApi(requestData: any) {
    this.isDataLoading = true;
    this.authService.loginExistingUser(requestData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.parseResponse(retData,requestData);
          } else {
            this.toastService.errorMessage(Messages.Login_Failure_Message, 3000);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
         
          this.isDataLoading = false;
        }
      });
  }

  /**
   * Method to parse login response
   * @param retData server response
   * @param requestData request data
   */
  parseResponse(retData: any, requestData: any) {
    if (retData.data.Table != null && retData.data.Table.length > 0 && retData.data.Table[0].UserRole) {
      const userRole=retData.data.Table[0].UserRole;
      const userName=requestData.Email;
      this.storageService.setSessionStorageData('userRole', userRole);
      this.storageService.setSessionStorageData('userName', userName);
      this.checkForNavigation(userRole);
    } else {
      this.toastService.errorMessage(Messages.Login_Failure_Message, 3000);
    }
  }

  /**
   * Method to check role based routing
   */
  checkForNavigation(userRole: any) {

    let routerPath = '';
    switch (userRole) {

      case 'Admin':
        routerPath = 'admin';
        break
      case 'Doctor':
        routerPath = 'doctor';
        break
      case 'Patient':
          routerPath = 'patient';
          break
      case 'Staff':
          routerPath = 'staff';
          break

      // add cases later //
      default:
        routerPath = 'home';
    }
    this.router.navigate([routerPath]);
  }
}