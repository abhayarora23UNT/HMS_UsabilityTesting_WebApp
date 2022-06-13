import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminTreatmentService } from 'src/app/core/services/admin/admin-treatment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.scss']
})
export class AddTreatmentComponent implements OnInit ,OnDestroy{
  AddTreatment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  operativeRoomIdList: any = []; // dropdown list for hospital Id
  doctorIdList: any = [];   // dropdown list for doctor Id
  patientIdList: any = [];  // dropdown list for patient Id
  constructor(private formBuilder: FormBuilder, private treatmentService: AdminTreatmentService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.getDoctorsList();
    this.getOperativeRoomList();
    this.getPatientsList();
  }

  /**
   * Method called on page destroy
   */
   ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  createFormGroup() {
    this.AddTreatment = this.formBuilder.group({
      operativeRoomId: ['', Validators.required],
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      name: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

   /**
   * Method to create appointment
   */
    createTreatment() {
      if (this.AddTreatment.status == Constants.FormInvalid) {
        this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
      } else {
        const fgValue = JSON.parse(JSON.stringify(this.AddTreatment.value));
        console.log('data is  ' + fgValue);
        this.callCreateTreatmentApi(fgValue);
      }
    }
  
    /**
      * Method to called create appointment api
      * @param respData 
      */
     callCreateTreatmentApi(respData: any) {
      this.isDataLoading = true;
      this.treatmentService.createTreatmentList(respData)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.CreateTreatment);
              this.AddTreatment.markAsPristine();
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
     * Method to navigate to appointment list screen
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
