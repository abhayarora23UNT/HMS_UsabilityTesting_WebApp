import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminDoctorService} from 'src/app/core/services/admin/admin-doctor.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit , OnDestroy{

  fgEditDoctor!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();

  genderList: string[] = [
    'Male',
    'Female',
    'Others'
  ]

  editDoctorData: any;
  constructor(private formBuilder: FormBuilder, private doctorService: AdminDoctorService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['editDoctorData']) {
        this.editDoctorData = JSON.parse(params['editDoctorData']);
      }
    });

  }

  ngOnInit(): void {
    this.bindFormData(this.editDoctorData);
  }
   /**
   * Method called on page destroy
   */
    ngOnDestroy(): void {
      this.onDestroy$.next();
    }

    /**
   * Method to create form group
   */
     createFormGroup() {
      this.fgEditDoctor = this.formBuilder.group({
        name: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        designation: [''],
        gender: ['', Validators.required],
        doctorId:['']
      });
    }

    /**
   * Method to bind form data
   * @param formData 
   */
  bindFormData(formData: any) {
    if (formData) {
      this.fgEditDoctor.patchValue(this.editDoctorData);
    }
  }

    /**
   * Method to navigate to appointment list
   */
     routetoListDoctorScreen() {
    this.router.navigate(['admin/dashboard/listDoctor']);
  }

  
  editDoctor() {
    const phone1Val = this.fgEditDoctor.controls['phone'].value;
    if (phone1Val !== '' && phone1Val.length < 10) {
      this.toastService.errorMessage(Messages.phn_Length_valdation);
    }
    else {
      if (this.fgEditDoctor.status == Constants.FormInvalid) {
        this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
      } else {
        const fgValue = JSON.parse(JSON.stringify(this.fgEditDoctor.value));
        console.log('data is  ' + fgValue);
        this.callDoctorApi(fgValue);
      }
    }
  }

      /**
    * Method to called update appointment api
    * @param respData 
    */
  callDoctorApi(respData: any) {
    this.isDataLoading = true;
    this.doctorService.editDoctorsList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateDoctorSuccess);
            this.fgEditDoctor.markAsPristine();
            this.routetoListDoctorScreen();
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
