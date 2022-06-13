import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { AdminOperativeRoomService } from 'src/app/core/services/admin/admin-operative-room.service';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Operative } from 'src/app/shared/models/operative/operative-resp-data';

@Component({
  selector: 'app-list-operative',
  templateUrl: './list-operative.component.html',
  styleUrls: ['./list-operative.component.scss']
})
export class ListOperativeComponent implements OnInit, OnDestroy {

  appointmentColumns: string[] = ['roomTypeId', 'roomNo', 'bedNo', 'startDate', 'endDate', 'action'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private operativeService: AdminOperativeRoomService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.getOperativeRoomList();
  }

  /**
   * Method to navigate to edit page 
   * @param event 
   */
  editOperative(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        editOperativeData: JSON.stringify(event)
      },
      skipLocationChange: true
    };
    this.router.navigate(['admin/dashboard/editOperativeRoom'], navigationExtras);
  }

  /**
   * Method to get Patient list
   */
  getOperativeRoomList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.operativeService.getOperativeRoomList('')
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
      const respObj = new Operative();
      respObj.operativeRoomId = row.OperativeRoomId;
      respObj.roomTypeId = row.RoomTypeId;
      respObj.roomNo = row.RoomNo;
      respObj.bedNo = row.BedNo;
      respObj.startDate = row.StartDate;
      respObj.endDate = row.EndDate;
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }


  /**
   * Method to delete existing Patient
   * @param event 
   */
  deleteOperative(event: any) {
    this.showDeleteAppointmentDialog(event);
  }

  /**
  * Method to show delete confirmation dialog
  * @param data 
  */
  showDeleteAppointmentDialog(data: any) {
    const message = Messages.Dialog_Confirmation_Delete_Message;

    const dialogData = {
      title: "Delete Operative Room",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.callDeleteOperativeApi(data);
      }
    });

  }

  /**
  * Method to called delete Patient api
  * @param respData 
  */
  callDeleteOperativeApi(respData: any) {
    this.isDataLoading = true;
    this.operativeService.deleteOperativeRoomList(respData.operativeRoomId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteOperativeSuccess);
            this.getOperativeRoomList();
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

  navigateToOperativeRoom() {
    this.router.navigate(["admin/dashboard/addOperativeRoom"]);
  }
}



