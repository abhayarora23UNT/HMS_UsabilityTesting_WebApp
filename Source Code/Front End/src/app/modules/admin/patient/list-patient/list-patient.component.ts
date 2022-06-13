import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { AdminPatientService } from 'src/app/core/services/admin/admin-patient.service';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Patient } from 'src/app/shared/models/patient/patient-resp-data';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit, OnDestroy {

  appointmentColumns: string[] = ['name', 'disease', 'phone', 'gender', 'email', 'action'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private patientService: AdminPatientService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.getPatientsList();
  }

  /**
   * Method to navigate to edit page 
   * @param event 
   */
  editPatient(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        editPatientData: JSON.stringify(event)
      },
      skipLocationChange: true
    };
    this.router.navigate(['admin/dashboard/editPatient'], navigationExtras);
  }

  /**
   * Method to get Patient list
   */
  getPatientsList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.patientService.getPatientsList('')
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
   * Method to parse Patient list response
   * @param retData 
   */
  parseListResponse(retData: any) {
    const respObjLst = [];
    for (const row of retData.data.Table) {
      const respObj = new Patient();
      respObj.patientId = row.PatientId;
      respObj.name = row.Name;
      respObj.address1 = row.Address1;
      respObj.address2 = row.Address2;
      respObj.city = row.City;
      respObj.phone = row.Phone;
      respObj.disease = row.Disease;
      respObj.gender = row.Gender;
      respObj.email = row.Email;
      respObj.guardianPhone = row.GuardianPhone
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }


  /**
   * Method to delete existing Patient
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
      title: "Delete Patient",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.callDeletePatientApi(data);
      }
    });

  }

  /**
  * Method to called delete Patient api
  * @param respData 
  */
  callDeletePatientApi(respData: any) {
    this.isDataLoading = true;
    this.patientService.deletePatientsList(respData.patientId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeletePatientSuccess);
            this.getPatientsList();
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

  navigateToPatient() {
    this.router.navigate(["admin/dashboard/addPatient"]);
  }

}