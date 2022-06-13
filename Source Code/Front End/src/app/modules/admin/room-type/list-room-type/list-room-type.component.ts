import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras,Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { AdminRoomTypeService} from 'src/app/core/services/admin/admin-room-type.service';
import { HospitalBranch } from 'src/app/shared/models/hospital/hospital-branch-resp-data';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-room-type',
  templateUrl: './list-room-type.component.html',
  styleUrls: ['./list-room-type.component.scss']
})
export class ListRoomTypeComponent implements OnInit ,OnDestroy{

   isDataLoading = false; // flag to hide/show loader
  dataSource: any = [];
  appointmentColumns: string[] = ['name', 'description','action'];  // table columns
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private roomTypeService: AdminRoomTypeService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getRoomTypeList();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

   /**
   * Method to get Room Type list
   */
    getRoomTypeList() {
      this.isDataLoading = true;
      this.dataSource = [];
      this.roomTypeService.getRoomTypeList('')
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
     * Method to parse room type list response
     * @param retData 
     */
    parseListResponse(retData: any) {
      const respObjLst = [];
      for (const row of retData.data.Table) {
        const respObj = new HospitalBranch();
        respObj.roomTypeId = row.RoomTypeId;
        respObj.name = row.Name;
        respObj.description = row.Description;
        respObjLst.push(respObj);
      }
      this.dataSource = respObjLst;
    }
  
     /**
     * Method to navigate to edit room type page
     * @param event 
     */
      editRomType(event: any) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            editRoomTypeData: JSON.stringify(event),
          },
          skipLocationChange:true
        };
        this.router.navigate(['admin/dashboard/editRoomType'], navigationExtras);
      }
    
      /**
       * Method to delete existing room type
       * @param event 
       */
       deleteRoomType(event: any) {
        this.showDeleteAppointmentDialog(event);
      }
  
      /**
     * Method to show delete confirmation dialog
     * @param data 
     */
    showDeleteAppointmentDialog(data: any) {
      const message = Messages.Dialog_Confirmation_Delete_Message;
  
      const dialogData = {
        title: "Delete RoomType",
        message: message
      };
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.callDeleteRoomTypeApi(data);
        }
      });
  
    }
  
    /**
      * Method to called delete Room Type api
      * @param respData 
      */
     callDeleteRoomTypeApi(respData: any) {
      this.isDataLoading = true;
      this.roomTypeService.deleteRoomTypeList(respData.roomTypeId)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.DeleteRoomSuccess);
              this.getRoomTypeList();
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
     * Method to navigate to add room type screen.
     */
     navigateToRoomType() {
      this.router.navigate(["admin/dashboard/addRoomType"]);
    }
  
  
  }


