import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { HospitalBranchService } from 'src/app/core/services/admin/hospital-branch.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
@Component({
  selector: 'app-edit-hospital-branch',
  templateUrl: './edit-hospital-branch.component.html',
  styleUrls: ['./edit-hospital-branch.component.scss']
})
export class EditHospitalBranchComponent implements OnInit , OnDestroy {

  fgEditHospitalBranch!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  editHospitalData: any;
  constructor(private formBuilder: FormBuilder, private appointmentService: HospitalBranchService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['editHospitalData']) {
        this.editHospitalData = JSON.parse(params['editHospitalData']);
      }
    });

  }

  ngOnInit(): void {
    this.bindFormData(this.editHospitalData);
  }

  /**
   * Method called on page destroy
   */
   ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method to bind form data
   * @param formData 
   */
   bindFormData(formData: any) {
    if (formData) {
      this.fgEditHospitalBranch.patchValue(this.editHospitalData);
    }
  }

  createFormGroup() {
    this.fgEditHospitalBranch = this.formBuilder.group({
      hospitalId: [''],
      hospitalCode:[''],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2:[''],
      city: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      email: ['', Validators.required],
      description:['']

    });
  }

  navigateToListHospitalBranchScreen() {
    this.router.navigate(['admin/dashboard/listHospitalBranch']);
  }

  editHospitalBranch() {
    const phone1Val = this.fgEditHospitalBranch.controls['phone1'].value;
    const phone2Val = this.fgEditHospitalBranch.controls['phone2'].value;
    if (phone1Val !== '' && phone1Val.length < 10) {
      this.toastService.errorMessage(Messages.phn_Length_valdation + ' ' + Messages.Phone1_Field_Message);
    } else if (phone2Val !== '' && phone2Val.length < 10) {
      this.toastService.errorMessage(Messages.phn_Length_valdation + ' ' + Messages.Phone2_Field_Message);
    }
     else{
    if (this.fgEditHospitalBranch.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditHospitalBranch.value));
      console.log('data is  ' + fgValue);
      this.callHospitalApi(fgValue);
    }
  }}

    /**
    * Method to called update appointment api
    * @param respData 
    */
     callHospitalApi(respData: any) {
      this.isDataLoading = true;
      this.appointmentService.editHospitalBranchList(respData)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.UpdateHospitalBranchSuccess);
              this.fgEditHospitalBranch.markAsPristine();
              this.navigateToListHospitalBranchScreen();
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
