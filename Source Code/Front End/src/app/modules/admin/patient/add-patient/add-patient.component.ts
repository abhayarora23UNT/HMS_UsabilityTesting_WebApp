import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminPatientService } from 'src/app/core/services/admin/admin-patient.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit,OnDestroy {
  Genders: string[] = [
    'Male',
    'Female',
    'Others'
  ]
  fgAddPatient!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private PatientService: AdminPatientService, private toastService: ToastMessageService,
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
    this.fgAddPatient = this.formBuilder.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2:[''],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      disease: [''],
      gender: ['', Validators.required],
    });
  }
  createPatient(res: any){
    if(res.length < 10){
      this.toastService.errorMessage(Messages.phn_Length_valdation);
     }
     else{
    if (this.fgAddPatient.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgAddPatient.value));
      console.log('data is  ' + fgValue);
      this.callCreatePatientApi(fgValue);
    }
  }}

  /**
    * Method to called create appointment api
    * @param respData 
    */
   callCreatePatientApi(respData: any) {
    this.isDataLoading = true;
    this.PatientService.createPatientsList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.CreatePatientSuccess);
            this.fgAddPatient.markAsPristine();
            this.navigateToListPatientcreen();
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


  navigateToListPatientcreen() {
    this.router.navigate(['admin/dashboard/listPatient']);
  }
}
