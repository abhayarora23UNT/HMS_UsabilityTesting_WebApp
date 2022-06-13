import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Messages } from 'src/app/core/messages/messages';
import { DoctorAppointmentService } from 'src/app/core/services/doctor/doctor-apppointment.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DocAppointmentMedicine } from 'src/app/shared/models/doctor/appointment-medicine-resp-data';

@Component({
  selector: 'app-patient-list-appointment-medicines',
  templateUrl: './list-appointment-medicines.component.html',
  styleUrls: ['./list-appointment-medicines.component.scss']
})
export class ListAppointmentMedicinesComponent implements OnInit {

  appointmentMedicineColumns: string[] = ['appointmentId', 'medicineId', 'limits'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private doctorService: DoctorAppointmentService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAppointmentMedicineList();
  }
  /**
   * Method called on page destroy
   */
   ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method to get appointment medicine list
   */
  getAppointmentMedicineList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.doctorService.getAppointmentMedicineList('')
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
      const respObj = new DocAppointmentMedicine();
      respObj.appointmentId = row.AppointmentId;
      respObj.apptMedicineId = row.ApptMedicineId;
      respObj.medicineId = row.MedicineId;
      respObj.limits = row.Limits;
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }

}
