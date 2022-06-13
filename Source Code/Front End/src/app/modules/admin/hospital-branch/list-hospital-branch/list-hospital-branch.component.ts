import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras,Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { HospitalBranchService } from 'src/app/core/services/admin/hospital-branch.service';
import { HospitalBranch } from 'src/app/shared/models/hospital/hospital-branch-resp-data';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-hospital-branch',
  templateUrl: './list-hospital-branch.component.html',
  styleUrls: ['./list-hospital-branch.component.scss']
})
export class ListHospitalBranchComponent implements OnInit,OnDestroy {
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = [];
  appointmentColumns: string[] = ['name', 'address1', 'phone1', 'email', 'city', 'action'];  // table columns
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private hospialBranchService: HospitalBranchService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.getHospitalBranchList();
  }

  /**
   * Method to get Hospital Branch list
   */
   getHospitalBranchList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.hospialBranchService.getHospitalBranchList('')
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
      const respObj = new HospitalBranch();
      respObj.hospitalId = row.HospitalId;
      respObj.hospitalCode = row.HospitalCode;
      respObj.name = row.Name;
      respObj.address1 = row.Address1;
      respObj.address2 = row.Address2;
      respObj.city = row.City;
      respObj.phone1 = row.Phone1;
      respObj.phone2 = row.Phone2;
      respObj.description = row.Description;
      respObj.email = row.Email;
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
          editHospitalData: JSON.stringify(event),
        },
        skipLocationChange:true
      };
      this.router.navigate(['admin/dashboard/editHospitalBranch'], navigationExtras);
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
      title: "Delete HospitalBranch",
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
    this.hospialBranchService.deleteHospitalBranchList(respData.hospitalId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteHospitalBranchSuccess);
            this.getHospitalBranchList();
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
    this.router.navigate(["admin/dashboard/addHospitalBranch"]);
  }


}