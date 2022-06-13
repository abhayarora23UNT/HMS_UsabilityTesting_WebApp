import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { TreatmentService } from 'src/app/core/services/doctor/doctor-treatment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-doc-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.scss']
})
export class EditTreatmentMedicineComponent implements OnInit, OnDestroy {

  fgEditTreatment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  treatmentIdList: any = [];   // dropdown list for doctor Id
  medicineIdList: any = [];  // dropdown list for patient Id
  treatmentMedicineData:any;
  constructor(private formBuilder: FormBuilder, private treatmentService: TreatmentService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService,private route: ActivatedRoute) {
    this.createFormGroup();
    
    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['treatmentData']) {
        this.treatmentMedicineData = JSON.parse(params['treatmentData']);
      }
    });
  }

  /**
   * Method called on page Init
   */
  ngOnInit(): void {
    this.getMedicinesList();
    this.getTreatmentList();
    this.bindFormData(this.treatmentMedicineData);
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
      this.fgEditTreatment.patchValue(this.treatmentMedicineData);
    }
  }


  /**
   * Method to create form group
   */
  createFormGroup() {
    this.fgEditTreatment = this.formBuilder.group({
      treatmentMedicineId: ['',],
      treatmentId: ['', Validators.required],
      medicineId: ['', Validators.required],
      limits: ['', Validators.required],
    });
  }

  /**
   * Method to update Treatment
   */
   updateTreatment() {
    if (this.fgEditTreatment.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditTreatment.value));
      console.log('data is  ' + fgValue);
      fgValue.limit = +fgValue.limits
      this.callUpdateTreatmentApi(fgValue);
    }
  }

  /**
    * Method to called update Treatment api
    * @param respData 
    */
   callUpdateTreatmentApi(respData: any) {
    this.isDataLoading = true;
    this.treatmentService.editTreatmentMedicine(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateTreatmentMedicineSuccess);
            this.routeToListTreatmentScreen();
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
   * Method to navigate to Treatment list screen
   */
   routeToListTreatmentScreen() {
    this.router.navigate(['doctor/dashboard/listTreatmentMedicine']);
  }


  /**
   * Function called to get treatment List
   */
  getTreatmentList() {
    this.lookupService.getTreatmentList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.treatmentIdList = retData.data.Table;
          }
          else {
            this.toastService.infoMessage(Messages.No_Records_Message);
          }
        } else {
          this.toastService.errorMessage(retData.message);
        }
      });
  }

  /**
   * Function called to get medicine List
   */
  getMedicinesList() {
    this.lookupService.getMedicinesList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.medicineIdList = retData.data.Table;
          }
          else {
            this.toastService.infoMessage(Messages.No_Records_Message);
          }
        } else {
          this.toastService.errorMessage(retData.message);
        }
      });
  }

}
