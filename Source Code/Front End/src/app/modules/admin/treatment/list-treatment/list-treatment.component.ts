import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Messages } from 'src/app/core/messages/messages';
import { AdminTreatmentService } from 'src/app/core/services/admin/admin-treatment.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Treatment } from 'src/app/shared/models/Treatment/treatment-resp-data';

@Component({
  selector: 'app-admin-list-treatment',
  templateUrl: './list-treatment.component.html',
  styleUrls: ['./list-treatment.component.scss']
})
export class ListTreatmentComponent implements OnInit , OnDestroy{

  appointmentColumns: string[] = ['doctorId', 'patientId', 'name', 'duration', 'action'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private treatmentService: AdminTreatmentService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getTreatmentList();
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
    getTreatmentList() {
      this.isDataLoading = true;
      this.dataSource = [];
      this.treatmentService.getTreatmentList('')
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
        const respObj = new Treatment();
        respObj.patientId = row.PatientId;
        respObj.doctorId = row.DoctorId;
        respObj.operativeRoomId = row.OperativeRoomId;
        respObj.doctorId = row.DoctorId;
        respObj.name = row.Name;
        respObj.duration = row.Duration;
        respObj.treatmentId = row.TreatmentId;
        respObjLst.push(respObj);
      }
      this.dataSource = respObjLst;
    }
  
    /**
     * Method to navigate to edit appointment page
     * @param event 
     */
     editTreatment(event: any) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          treatmentData: JSON.stringify(event),
        },
        skipLocationChange:true
      };
      this.router.navigate(['admin/dashboard/editTreatment'], navigationExtras);
    }
  
    /**
     * Method to delete existing appointment
     * @param event 
     */
     deleteTreatment(event: any) {
      this.showDeleteAppointmentDialog(event);
    }
  
    /**
     * Method to show delete confirmation dialog
     * @param data 
     */
    showDeleteAppointmentDialog(data: any) {
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
      * Method to called delete appointment api
      * @param respData 
      */
     callDeleteTreatmentApi(respData: any) {
      this.isDataLoading = true;
      this.treatmentService.deleteTreatmentList(respData.treatmentId)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.DeleteTreatment);
              this.getTreatmentList();
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
     navigateToTreatment() {
      this.router.navigate(["admin/dashboard/addTreatment"]);
    }

}
