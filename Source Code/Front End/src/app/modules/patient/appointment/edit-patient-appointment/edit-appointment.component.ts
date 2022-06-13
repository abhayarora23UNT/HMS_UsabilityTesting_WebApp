import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { DoctorAppointmentService } from 'src/app/core/services/doctor/doctor-apppointment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { PatientService } from 'src/app/core/services/patient/patient.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-patient-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditPatientAppointmentComponent implements OnInit, OnDestroy {

  fgEditAppointment!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  hospitalIdList: any = [];
  doctorIdList: any = [];
  patientIdList: any = [];

  appointmentData: any;
  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
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
    this.getDoctorsList();
    this.getHospitalBranchList();
    this.getPatientsList();
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
      appointmentId: ['', ],
      appointmentCode: ['', ],
      hospitalId: ['', Validators.required],
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      appt_Date: ['', Validators.required],
      diseaseNotes: [''],
      fee: ['', Validators.required],
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
   * Method to edit appointment
   */
  editAppointment() {
    if (this.fgEditAppointment.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditAppointment.value));
      console.log('data is  ' + fgValue);
      fgValue.fee = +fgValue.fee;
      fgValue.appt_Date = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.appt_Date);
      this.callEditAppointmentApi(fgValue);
    }
  }

  /**
    * Method to called update appointment api
    * @param respData 
    */
  callEditAppointmentApi(respData: any) {
    this.isDataLoading = true;
    this.patientService.editPatientAppointment(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateDocAppointmentSuccess);
            this.fgEditAppointment.markAsPristine();
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
   * Method to navigate to appointment list
   */
  navigateToListAppointmentScreen() {
    this.router.navigate(['patient/dashboard/listPatientAppointment']);
  }

  /**
   * Function called to get hospital branch List
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
