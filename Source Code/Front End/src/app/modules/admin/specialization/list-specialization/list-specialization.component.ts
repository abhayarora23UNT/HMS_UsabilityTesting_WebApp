import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras,Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { AdminSpecializationService} from 'src/app/core/services/admin/admin-specialization.service';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Patient } from 'src/app/shared/models/patient/patient-resp-data';

@Component({
  selector: 'app-list-specialization',
  templateUrl: './list-specialization.component.html',
  styleUrls: ['./list-specialization.component.scss']
})
export class ListSpecializationComponent implements OnInit {

  appointmentColumns: string[] = ['name', 'KeyAres', 'status', 'action'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = []; 
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private specializaionService: AdminSpecializationService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getSpecialization();
  }

  /**
   * Method to navigate to edit page 
   * @param event 
   */
   editSpecialization(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        editSpecializationData: JSON.stringify(event)
      },
      skipLocationChange:true
    };
    this.router.navigate(['admin/dashboard/editSpecialization'], navigationExtras);
  }

  /**
   * Method to get Patient list
   */
   getSpecialization() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.specializaionService.getSpecialization('')
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
      respObj.specializationId = row.SpecializationId;
      respObj.name = row.Name;
      respObj.status = row.Status;
      respObj.KeyAres = row.KeyAres;
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }

 
  /**
   * Method to delete existing Patient
   * @param event 
   */
   deleteSpecialization(event: any) {
    this.showDeleteAppointmentDialog(event);
  }

   /**
   * Method to show delete confirmation dialog
   * @param data 
   */
    showDeleteAppointmentDialog(data: any) {
      const message = Messages.Dialog_Confirmation_Delete_Message;
  
      const dialogData = {
        title: "Delete Specializtion",
        message: message
      };
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.callDeleteSpecializationApi(data);
        }
      });
  
    }

    /**
    * Method to called delete Patient api
    * @param respData 
    */
     callDeleteSpecializationApi(respData: any) {
    this.isDataLoading = true;
    this.specializaionService.deleteSpecialization(respData.specializationId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteSpecialization);
            this.getSpecialization();
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

  navigateToSpecialization() {
    this.router.navigate(["admin/dashboard/addSpecialization"]);
  }
}
