import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras,Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { AdminDoctorService } from 'src/app/core/services/admin/admin-doctor.service';
import { Doctor } from 'src/app/shared/models/doctor/doctor-resp-data';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent implements OnInit,OnDestroy {
  appointmentColumns: string[] = ['name', 'designation', 'phone', 'gender', 'email','action'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = []; 
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private router: Router, private doctorService: AdminDoctorService, private lookupService: LookupService, private toastService: ToastMessageService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDoctorsList();
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method to navigate to edit appointment page
   * @param event 
   */
   editdoctor(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        editDoctorData: JSON.stringify(event)
      },
      skipLocationChange:true
    };
    this.router.navigate(['admin/dashboard/editDoctor'], navigationExtras);
  }

  /**
   * Method to delete existing appointment
   * @param event 
   */
   deleteDoctor(event: any) {
    this.showDeleteDoctorDialog(event);
  }

   /**
   * Method to show delete confirmation dialog
   * @param data 
   */
    showDeleteDoctorDialog(data: any) {
      const message = Messages.Dialog_Confirmation_Delete_Message;
  
      const dialogData = {
        title: "Delete Doctor",
        message: message
      };
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.callDeleteDoctorApi(data);
        }
      });
  
    }
  
    /**
      * Method to called delete appointment api
      * @param respData 
      */
     callDeleteDoctorApi(respData: any) {
      this.isDataLoading = true;
      this.doctorService.deleteDoctorsList(respData.doctorId)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.DeleteDoctorSuccess);
              this.getDoctorsList();
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
  
  navigateToAppointment() {
    this.router.navigate(["admin/dashboard/addDoctor"]);
  }

  
  /**
   * Method to get appointment list
   */
   getDoctorsList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.doctorService.getDoctorsList('')
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
      const respObj = new Doctor();
      respObj.doctorId = row.DoctorId;
      respObj.gender = row.Gender;
      respObj.name = row.Name;
      respObj.address1 = row.Address1;
      respObj.address2 = row.Address2;
      respObj.city = row.City;
      respObj.phone = row.Phone;
      respObj.mobile = row.Mobile;
      respObj.salary = row.Salary;
      respObj.email = row.Email;
      respObj.designation = row.Designation;
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }

}