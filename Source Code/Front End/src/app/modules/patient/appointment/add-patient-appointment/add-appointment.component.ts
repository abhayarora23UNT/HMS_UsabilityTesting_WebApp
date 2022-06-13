import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { PatientService } from 'src/app/core/services/patient/patient.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-patient-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddPatientAppointmentComponent implements OnInit, OnDestroy {

  fgAddAppointment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  hospitalIdList: any = []; // dropdown list for hospital Id
  doctorIdList: any = [];   // dropdown list for doctor Id
  patientIdList: any = [];  // dropdown list for patient Id

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();
  }

  /**
   * Method called on page Init
   */
  ngOnInit(): void {
    this.getDoctorsList();
    this.getHospitalBranchList();
    this.getPatientsList();
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
      hospitalId: ['', Validators.required],
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      appt_Date: ['', Validators.required],
      diseaseNotes: [''],
      fee: ['', Validators.required],
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
      console.log('data is  ' + fgValue);
      fgValue.fee = +fgValue.fee
      fgValue.appt_Date = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.appt_Date);
      this.callCreateAppointmentApi(fgValue);
    }
  }

  /**
    * Method to called create appointment api
    * @param respData 
    */
  callCreateAppointmentApi(respData: any) {
    this.isDataLoading = true;
    this.patientService.createPatientAppointment(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.CreateDocAppointmentSuccess);
            this.fgAddAppointment.markAsPristine();
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
    this.router.navigate(['patient/dashboard/listPatientAppointment']);
  }

  /**
   * Method called to get hospital branch List
   */
  getHospitalBranchList() {
    this.lookupService.getHospitalBranchList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.hospitalIdList = retData.data.Table;
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

}
