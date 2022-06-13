import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { DoctorAppointmentService } from 'src/app/core/services/doctor/doctor-apppointment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-doc-add-appointment-medicine',
  templateUrl: './add-appointment-medicine.component.html',
  styleUrls: ['./add-appointment-medicine.component.scss']
})
export class AddAppointmentMedicineComponent implements OnInit {

  fgAddAppointment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  appointmentIdList: any = []; // dropdown list for hospital Id
  medicineIdList: any = [];   // dropdown list for doctor Id
  

  constructor(private formBuilder: FormBuilder, private appointmentService: DoctorAppointmentService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();
  }

  /**
   * Method called on page Init
   */
  ngOnInit(): void {
    this.getAppointmentList();
    this.getMedicineList();
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
    this.fgAddAppointment = this.formBuilder.group({
      appointmentId: ['', Validators.required],
      apptMedicineId: [''],
      medicineId: ['', Validators.required],
      limit: ['', Validators.required],
    });
  }

  /**
   * Method to create appointment
   */
  createAppointment() {
    if (this.fgAddAppointment.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgAddAppointment.value));
      fgValue.limit=+fgValue.limit;
      console.log('data is  ' + fgValue);
      this.callCreateAppointmentApi(fgValue);
    }
  }

  /**
    * Method to called create appointment api
    * @param respData 
    */
  callCreateAppointmentApi(respData: any) {
    this.isDataLoading = true;
    this.appointmentService.createAppointmentMedicine(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.CreateDocAppointmentSuccess);
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
