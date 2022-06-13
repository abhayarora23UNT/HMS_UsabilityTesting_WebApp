import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import {AdminTreatmentService } from 'src/app/core/services/admin/admin-treatment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.scss']
})
export class EditTreatmentComponent implements OnInit {

  EditTreatment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  operativeRoomIdList: any = [];
  doctorIdList: any = [];
  patientIdList: any = [];

  treatmentData: any;
  constructor(private formBuilder: FormBuilder, private treatmentService: AdminTreatmentService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['treatmentData']) {
        this.treatmentData = JSON.parse(params['treatmentData']);
      }
    });

  

}  ngOnInit(): void {
  this.getDoctorsList();
    this.getOperativeRoomList();
    this.getPatientsList();
    this.bindFormData(this.treatmentData);
    throw new Error('Method not implemented.');
  }

  createFormGroup() {
    this.EditTreatment = this.formBuilder.group({
      operativeRoomId: ['', Validators.required],
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      name: ['', Validators.required],
      duration: ['', Validators.required],
      treatmentId:[''],
    });
  }

  /**
   * Method to bind form data
   * @param formData 
   */
   bindFormData(formData: any) {
    if (formData) {
      this.EditTreatment.patchValue(this.treatmentData);
    }
  }

  /**
   * Method to edit appointment
   */
   editTreatment() {
    if (this.EditTreatment.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.EditTreatment.value));
      console.log('data is  ' + fgValue);
      this.callEditTreatmentApi(fgValue);
    }
  }

  /**
    * Method to called update appointment api
    * @param respData 
    */
   callEditTreatmentApi(respData: any) {
    this.isDataLoading = true;
    this.treatmentService.editTreatmentList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateTreatment);
            this.EditTreatment.markAsPristine();
            this.navigateToListTreatmentScreen();
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
   * Method to navigate to appointment list
   */
   navigateToListTreatmentScreen() {
    this.router.navigate(['admin/dashboard/listTreatment']);
  }

    /**
   * Function called to get doctors List
   */
     getDoctorsList() {
      this.lookupService.getDoctorsList()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((retData: any) => {
          if (retData.status) {
            if (retData.data.Table != null && retData.data.Table.length > 0) {
              this.doctorIdList = retData.data.Table;
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
     * Function called to get patient List
     */
    getPatientsList() {
      this.lookupService.getPatientsList()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((retData: any) => {
          if (retData.status) {
            if (retData.data.Table != null && retData.data.Table.length > 0) {
              this.patientIdList = retData.data.Table;
            }
            else {
              this.toastService.infoMessage(Messages.No_Records_Message);
            }
          } else {
            this.toastService.errorMessage(retData.message);
          }
        });
    }
  
    getOperativeRoomList() {
      this.lookupService.getOperativeRoomList()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((retData: any) => {
          if (retData.status) {
            if (retData.data.Table != null && retData.data.Table.length > 0) {
              this.operativeRoomIdList = retData.data.Table;
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