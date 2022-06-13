import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Messages } from 'src/app/core/messages/messages';
import { DoctorAppointmentService } from 'src/app/core/services/doctor/doctor-apppointment.service';
import { PatientService } from 'src/app/core/services/patient/patient.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DoctorAppointment } from 'src/app/shared/models/doctor/doctor-appointment-resp-data';

@Component({
  selector: 'app-patient-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss']
})
export class ListPatientAppointmentComponent implements OnInit, OnDestroy {


  appointmentColumns: string[] = ['doctorId', 'patientId', 'appt_Date', 'fee', 'action'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private patientService: PatientService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  /**
   * Method called on page init
   */
  ngOnInit(): void {
    this.getPatientAppointmentList();
  }

  /**
   * Method called on page destroy
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method to get appointment list
   */
   getPatientAppointmentList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.patientService.getPatientAppointmentList('')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            if (retData.data.Table != null && retData.data.Table.length > 0) {
              this.parseListResponse(retData);
            }
          } else {
            this.toastService.errorMessage(retData.message);
          }
          this.isDataLoading = false;
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
   * Method to parse appointment list response
   * @param retData 
   */
  parseListResponse(retData: any) {
    const respObjLst = [];
    for (const row of retData.data.Table) {
      const respObj = new DoctorAppointment();
      respObj.appointmentCode = row.AppointmentCode;
      respObj.appointmentId = row.AppointmentId;
      respObj.appt_Date = row.Appt_Date;
      respObj.doctorId = row.DoctorId;
      respObj.fee = row.Fee;
      respObj.diseaseNotes = row.DiseaseNotes;
      respObj.hospitalId = row.HospitalId;
      respObj.next_Appt_Date = row.Next_Appt_Date;
      respObj.patientId = row.PatientId;
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }

  /**
   * Method to navigate to edit appointment page
   * @param event 
   */
  editAppointment(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        appointmentData: JSON.stringify(event),
      },
      skipLocationChange:true
    };
    this.router.navigate(['patient/dashboard/editPatientAppointment'], navigationExtras);
  }

  /**
   * Method to delete existing appointment
   * @param event 
   */
  deleteAppointment(event: any) {
    this.showDeleteAppointmentDialog(event);
  }

  /**
   * Method to show delete confirmation dialog
   * @param data 
   */
  showDeleteAppointmentDialog(data: any) {
    const message = Messages.Dialog_Confirmation_Delete_Message;

    const dialogData = {
      title: "Delete Appointment",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.callDeleteAppointmentApi(data);
      }
    });

  }

  /**
    * Method to called delete appointment api
    * @param respData 
    */
  callDeleteAppointmentApi(respData: any) {
    this.isDataLoading = true;
    this.patientService.deletePatientAppointment(respData.appointmentId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteDocAppointmentSuccess);
            this.getPatientAppointmentList();
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
   * Method to navigate to add appointment screen.
   */
  navigateToAppointment() {
    this.router.navigate(["patient/dashboard/addPatientAppointment"]);
  }

}
