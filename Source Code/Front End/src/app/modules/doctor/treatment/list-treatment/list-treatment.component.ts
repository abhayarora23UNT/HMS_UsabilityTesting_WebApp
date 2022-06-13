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
  selector: 'app-doc-list-Treatment',
  templateUrl: './list-treatment.component.html',
  styleUrls: ['./list-treatment.component.scss']
})
export class ListTreatmentMedicineComponent implements OnInit, OnDestroy {


  TreatmentColumns: string[] = ['treatmentId', 'medicineId', 'limits', 'action'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private treatmentService: TreatmentService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  /**
   * Method called on page init
   */
  ngOnInit(): void {
    this.getDocTreatmentList();
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
  getDocTreatmentList() {
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

  /**
   * Method to navigate to edit Treatment page
   * @param event 
   */
  editTreatment(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        treatmentData: JSON.stringify(event)
      },
      skipLocationChange:true
    };
    this.router.navigate(['doctor/dashboard/editTreatmentMedicine'], navigationExtras);
  }

  /**
   * Method to delete existing Treatment
   * @param event 
   */
  deleteTreatment(event: any) {
    this.showDeleteTreatmentDialog(event);
  }

  /**
   * Method to show delete confirmation dialog
   * @param data 
   */
  showDeleteTreatmentDialog(data: any) {
    const message = Messages.Dialog_Confirmation_Delete_Message;

    const dialogData = {
      title: "Delete Treatment",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.callDeleteTreatmentApi(data);
      }
    });

  }

  /**
    * Method to called delete Treatment api
    * @param respData 
    */
  callDeleteTreatmentApi(respData: any) {
    this.isDataLoading = true;
    this.treatmentService.deleteTreatmentMedicine(respData.treatmentMedicineId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteTreatmentSuccess);
            this.getDocTreatmentList();
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
   * Method to navigate to add Treatment screen.
   */
   routeToTreatment() {
    this.router.navigate(["doctor/dashboard/addTreatmentMedicine"]);
  }

}
