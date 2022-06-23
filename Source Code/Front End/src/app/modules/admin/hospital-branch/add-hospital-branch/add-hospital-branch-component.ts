import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { HospitalBranchService } from 'src/app/core/services/admin/hospital-branch.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
@Component({
  selector: 'app-add-hospital-branch',
  templateUrl: './add-hospital-branch.component.html',
  styleUrls: ['./add-hospital-branch.component.scss']
})
export class AddHospitalBranchComponent implements OnInit , OnDestroy {
  fgAddHospitalBranch!: FormGroup;
  isDataLoading = false
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private appointmentService: HospitalBranchService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();
  }
  ngOnInit(): void {
    console.log('123');
  }

    /**
   * Method called on page destroy
   */
     ngOnDestroy(): void {
      this.onDestroy$.next();
    }

  createFormGroup() {
    this.fgAddHospitalBranch = this.formBuilder.group({
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

  createHospitalBranch(res : any){
    if(res.length < 10){
      this.toastService.errorMessage(Messages.phn_Length_valdation);
     }
     else{
    if (this.fgAddHospitalBranch.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgAddHospitalBranch.value));
      console.log('data is  ' + fgValue);
      this.callCreateHospitalBranchApi(fgValue);
    }}
  }
   /**
    * Method to called create appointment api
    * @param respData 
    */
    callCreateHospitalBranchApi(respData: any) {
      this.isDataLoading = true;
      this.appointmentService.createHospitalBranchList(respData)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.CreateHospitalBranchSuccess);
              this.fgAddHospitalBranch.markAsPristine();
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