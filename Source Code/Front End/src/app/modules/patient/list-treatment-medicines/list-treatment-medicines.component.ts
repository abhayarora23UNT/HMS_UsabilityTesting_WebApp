import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Messages } from 'src/app/core/messages/messages';
import { TreatmentService } from 'src/app/core/services/doctor/doctor-treatment.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DoctorTreatment } from 'src/app/shared/models/doctor/doctor-treatment-resp-data';

@Component({
  selector: 'app-patient-list-treatment-medicines',
  templateUrl: './list-treatment-medicines.component.html',
  styleUrls: ['./list-treatment-medicines.component.scss']
})
export class ListTreatmentMedicinesComponent implements OnInit {

  TreatmentColumns: string[] = ['treatmentId', 'medicineId', 'limits'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private treatmentService: TreatmentService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  
/**
   * Method called on page init
   */
 ngOnInit(): void {
  this.getTreatmentMedicineList();
}

/**
 * Method called on page destroy
 */
ngOnDestroy(): void {
  this.onDestroy$.next();
}

/**
 * Method to get Treatment list
 */
 getTreatmentMedicineList() {
  this.isDataLoading = true;
  this.dataSource = [];
  this.treatmentService.getTreatmentMedicineList('')
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
 * Method to parse Treatment list response
 * @param retData 
 */
parseListResponse(retData: any) {
  const respObjLst = [];
  for (const row of retData.data.Table) {
    const respObj = new DoctorTreatment();
    respObj.treatmentId = row.TreatmentId;
    respObj.treatmentMedicineId = row.TreatmentMedicineId;
    respObj.medicineId = row.MedicineId;
    respObj.limits = row.Limits;
    respObjLst.push(respObj);
  }
  this.dataSource = respObjLst;
}

}
