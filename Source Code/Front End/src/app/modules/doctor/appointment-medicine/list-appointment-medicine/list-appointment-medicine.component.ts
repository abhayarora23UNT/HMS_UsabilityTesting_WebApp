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
  selector: 'app-doc-list-appointment-medicine',
  templateUrl: './list-appointment-medicine.component.html',
  styleUrls: ['./list-appointment-medicine.component.scss']
})
export class ListAppointmentMedicineComponent implements OnInit, OnDestroy {

 
  appointmentMedicineColumns: string[] = ['appointmentId', 'medicineId', 'limits', 'action'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private doctorService: DoctorAppointmentService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  /**
   * Method called on page init
   */
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

  /**
   * Method to navigate to edit appointment page
   * @param event 
   */
  editAppointment(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        appointmentData: JSON.stringify(event)
      },
      skipLocationChange:true
    };
    this.router.navigate(['doctor/dashboard/editAppointmentMedicine'], navigationExtras);
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
      title: "Delete Appointment Medicine",
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
    this.doctorService.deleteAppointmentMedicine(respData.apptMedicineId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteDocAppointmentSuccess);
            this.getAppointmentMedicineList();
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
   * Method to navigate to add appointment medicine screen.
   */
  navigateToAppointment() {
    this.router.navigate(["doctor/dashboard/addAppointmentMedicine"]);
  }

}
