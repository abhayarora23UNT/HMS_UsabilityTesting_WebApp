import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { StaffPatientService } from 'src/app/core/services/staff/staff-patient.service';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Patient } from 'src/app/shared/models/patient/patient-resp-data';

@Component({
  selector: 'app-staff-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {

  appointmentColumns: string[] = ['name', 'disease', 'phone', 'gender', 'email', 'action'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private patientService: StaffPatientService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }
  

  ngOnInit(): void {
    this.getPatientsList();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
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
    this.router.navigate(['staff/dashboard/editPatient'], navigationExtras);
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

  navigateToPatient() {
    this.router.navigate(["staff/dashboard/addPatient"]);
  }


}
