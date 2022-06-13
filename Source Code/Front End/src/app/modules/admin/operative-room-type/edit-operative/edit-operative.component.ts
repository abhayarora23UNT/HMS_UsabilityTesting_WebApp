import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminOperativeRoomService } from 'src/app/core/services/admin/admin-operative-room.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-edit-operative',
  templateUrl: './edit-operative.component.html',
  styleUrls: ['./edit-operative.component.scss']
})
export class EditOperativeComponent implements OnInit,OnDestroy {

  fgEditOperative!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();

  editOperativeData: any;
  constructor(private formBuilder: FormBuilder, private operativeService: AdminOperativeRoomService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['editOperativeData']) {
        this.editOperativeData = JSON.parse(params['editOperativeData']);
      }
    });

  }

  ngOnInit(): void {
    this.bindFormData(this.editOperativeData);
  }

  /**
   * Method called on page destroy
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }


  createFormGroup() {
    this.fgEditOperative = this.formBuilder.group({
      operativeRoomId :[''],
      operativeRoomCode:[''],
      roomTypeId: ['', Validators.required],
      roomNo: ['', Validators.required],
      bedNo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],

    });
  }

  /**
 * Method to bind form data
 * @param formData 
 */
  bindFormData(formData: any) {
    if (formData) {
      this.fgEditOperative.patchValue(this.editOperativeData);
    }
  }

  navigateToOperativeScreen() {
    this.router.navigate(['admin/dashboard/listOperativeRoom']);
  }

  editOperative() {
    if (this.fgEditOperative.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditOperative.value));
      fgValue.startDate = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.startDate);
      fgValue.endDate = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.endDate);
      console.log('data is  ' + fgValue);
      this.callPatientApi(fgValue);
    }
  }

  /**
* Method to called update appointment api
* @param respData 
*/
  callPatientApi(respData: any) {
    this.isDataLoading = true;
    this.operativeService.editOperativeRoomList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateOperativeSuccess);
            this.fgEditOperative.markAsPristine();
            this.navigateToOperativeScreen();
          } else {
            this.toastService.errorMessage(retData.message);
          }
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

}


