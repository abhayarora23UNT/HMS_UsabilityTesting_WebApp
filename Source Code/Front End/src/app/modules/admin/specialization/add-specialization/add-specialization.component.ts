import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminSpecializationService } from 'src/app/core/services/admin/admin-specialization.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss']
})
export class AddSpecializationComponent implements OnInit,OnDestroy {

  Statuss: string[] = [
    'Active',
    'Inactive'
  ]
  fgAddSpecialization!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private specializationService: AdminSpecializationService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();
  }

  ngOnInit(): void {
  }
/**
   * Method called on page destroy
   */
 ngOnDestroy(): void {
  this.onDestroy$.next();
}

createFormGroup() {
this.fgAddSpecialization = this.formBuilder.group({
  name: ['', Validators.required],
  keyArea: ['', Validators.required],
  status: ['', Validators.required],
  
});
}
createSpecialization(){
if (this.fgAddSpecialization.status == Constants.FormInvalid) {
  this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
} else {
  const fgValue = JSON.parse(JSON.stringify(this.fgAddSpecialization.value));
  console.log('data is  ' + fgValue);
  this.callCreatePatientApi(fgValue);
}
}

/**
* Method to called create appointment api
* @param respData 
*/
callCreatePatientApi(respData: any) {
this.isDataLoading = true;
this.specializationService.createSpecialization(respData)
  .pipe(takeUntil(this.onDestroy$))
  .subscribe({
    next: (retData: any) => {
      this.isDataLoading = false;
      if (retData.status) {
        this.toastService.successMessage(Messages.createSpecialization);
        this.fgAddSpecialization.markAsPristine();
        this.navigateToSpecializationScreen();
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


navigateToSpecializationScreen() {
this.router.navigate(['admin/dashboard/listSpecialization']);
}
}

