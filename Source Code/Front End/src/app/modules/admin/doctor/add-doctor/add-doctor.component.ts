import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminDoctorService} from 'src/app/core/services/admin/admin-doctor.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit, OnDestroy {
  Genders: string[] = [
    'Male',
    'Female',
    'Others'
  ]
  fgAddDoctor!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private doctorService: AdminDoctorService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();
    
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
   * Method to create form group
   */
  createFormGroup() {
    this.fgAddDoctor = this.formBuilder.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2:[''],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      designation: [''],
      gender: ['', Validators.required],
    });
  }

  /**
   * Method to check validation,when add button is clicked
   */
  createDoctor(res : any){
    if(res.length < 10){
      this.toastService.errorMessage(Messages.phn_Length_valdation);
     }
     else{
    if (this.fgAddDoctor.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgAddDoctor.value));
      console.log('data is  ' + fgValue);
      this.callCreateDoctorApi(fgValue);
    }
  }}

  /**
    * Method to called create Doctor api
    * @param respData 
    */
   callCreateDoctorApi(respData: any) {
    this.isDataLoading = true;
    this.doctorService.createDoctorsList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.CreateDoctorSuccess);
            this.fgAddDoctor.markAsPristine();
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

  /**
   * Method to navigate to doctor list screen
   */
  routetoListDoctorScreen() {
    this.router.navigate(['admin/dashboard/listDoctor']);
  }
}
