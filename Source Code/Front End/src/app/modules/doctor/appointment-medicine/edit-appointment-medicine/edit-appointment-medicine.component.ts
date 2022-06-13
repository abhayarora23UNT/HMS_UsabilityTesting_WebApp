import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { DoctorAppointmentService } from 'src/app/core/services/doctor/doctor-apppointment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-doc-edit-appointment-medicine',
  templateUrl: './edit-appointment-medicine.component.html',
  styleUrls: ['./edit-appointment-medicine.component.scss']
})
export class EditAppointmentMedicineComponent implements OnInit, OnDestroy {

  fgEditAppointment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  appointmentIdList: any = []; // dropdown list for hospital Id
  medicineIdList: any = [];   // dropdown list for doctor Id
  appointmentData: any;

  constructor(private formBuilder: FormBuilder, private appointmentService: DoctorAppointmentService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService,private route: ActivatedRoute) {
    this.createFormGroup();
      // get existing appointment data from routing params //
      this.route.queryParams.subscribe(params => {
        if (params && params['appointmentData']) {
          this.appointmentData = JSON.parse(params['appointmentData']);
        }
      });
  }

  /**
   * Method called on page Init
   */
  ngOnInit(): void {
    this.getAppointmentList();
    this.getMedicineList();
    this.bindFormData(this.appointmentData);

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
    this.fgEditAppointment = this.formBuilder.group({
      appointmentId: ['', Validators.required],
      apptMedicineId: [''],
      medicineId: ['', Validators.required],
      limits: ['', Validators.required],
    });
  }


    /**
   * Method to bind form data
   * @param formData 
   */
     bindFormData(formData: any) {
      if (formData) {
        formData.appt_Date = new Date(formData.appt_Date);
        this.fgEditAppointment.patchValue(this.appointmentData);
      }
    }

  /**
   * Method to update appointment
   */
  updateAppointment() {
    if (this.fgEditAppointment.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditAppointment.value));
      fgValue.limit=+fgValue.limits;
      console.log('data is  ' + fgValue);
      this.callUpdateAppointmentApi(fgValue);
    }
  }

  /**
    * Method to called update appointment api
    * @param respData 
    */
   callUpdateAppointmentApi(respData: any) {
    this.isDataLoading = true;
    this.appointmentService.editAppointmentMedicine(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateDocAppointmentSuccess);
            this.navigateToListAppointmentScreen();
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
  navigateToListAppointmentScreen() {
    this.router.navigate(['doctor/dashboard/listAppointmentMedicine']);
  }

  /**
   * Method called to get medicine branch List
   */
  getMedicineList() {
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

  /**
   * Function called to get appointment List
   */
  getAppointmentList() {
    this.lookupService.getAppointmentList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.appointmentIdList = retData.data.Table;
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
