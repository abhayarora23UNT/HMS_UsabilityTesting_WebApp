import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import {AdminSpecializationService} from 'src/app/core/services/admin/admin-specialization.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
@Component({
  selector: 'app-edit-specialization',
  templateUrl: './edit-specialization.component.html',
  styleUrls: ['./edit-specialization.component.scss']
})
export class EditSpecializationComponent implements OnInit {

  fgEditSpecialization!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  statusList: string[] = [
    'Active',
    'Inactive'
  ]

  editSpecializationData: any;
  constructor(private formBuilder: FormBuilder, private specializationService: AdminSpecializationService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['editSpecializationData']) {
        this.editSpecializationData = JSON.parse(params['editSpecializationData']);
      }
    });

  }

  ngOnInit(): void {
    this.bindFormData(this.editSpecializationData);
  }
  /**
   * Method called on page destroy
   */
   ngOnDestroy(): void {
    this.onDestroy$.next();
  }
 

  createFormGroup() {
    this.fgEditSpecialization = this.formBuilder.group({
      name: ['', Validators.required],
      KeyAres: ['', Validators.required],
      status: ['', Validators.required],
      specializationId:[''],
      
    });
  }

  /**
 * Method to bind form data
 * @param formData 
 */
  bindFormData(formData: any) {
    if (formData) {
      this.fgEditSpecialization.patchValue(this.editSpecializationData);
    }
  }

  navigateToSpecializationScreen() {
    this.router.navigate(['admin/dashboard/listSpecialization']);
  }

  editSpecialization() {
    if (this.fgEditSpecialization.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditSpecialization.value));
      console.log('data is  ' + fgValue);
      const dataObject = {
        "name": this.fgEditSpecialization.controls['name'].value,
        "keyArea": this.fgEditSpecialization.controls['KeyAres'].value,
        "status": this.fgEditSpecialization.controls['status'].value,
        "specializationId":this.fgEditSpecialization.controls['specializationId'].value,

      }
      this.callPatientApi(dataObject);
    }
  }

  /**
* Method to called update appointment api
* @param respData 
*/
  callPatientApi(respData: any) {
    this.isDataLoading = true;
    this.specializationService.editSpecialization(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateSpecialization);
            this.fgEditSpecialization.markAsPristine();
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

}
