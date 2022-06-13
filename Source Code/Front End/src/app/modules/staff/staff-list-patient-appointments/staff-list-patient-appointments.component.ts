import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Messages } from 'src/app/core/messages/messages';
import { StaffAppointmentService } from 'src/app/core/services/staff/staff-appointment.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DoctorAppointment } from 'src/app/shared/models/doctor/doctor-appointment-resp-data';

@Component({
  selector: 'app-staff-list-patient-appointments',
  templateUrl: './staff-list-patient-appointments.component.html',
  styleUrls: ['./staff-list-patient-appointments.component.scss']
})
export class StaffListPatientAppointmentsComponent implements OnInit, OnDestroy {
  appointmentColumns: string[] = ['doctorId', 'patientId', 'appt_Date', 'fee'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private doctorService: StaffAppointmentService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getDocAppointmentList();
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
   getDocAppointmentList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.doctorService.getDocAppointmentList('')
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


}
