import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { AdminMedicineService } from 'src/app/core/services/admin/admin-medicine.service';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { medicine } from 'src/app/shared/models/medicines/medicine-resp-data';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.scss']
})
export class ListMedicineComponent implements OnInit {

  appointmentColumns: string[] = ['name', 'company', 'composition', 'expiryDate', 'cost', 'availabelQuantity', 'action'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private medicineService: AdminMedicineService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getMedicinesList();
  }
  /**
   * Method to navigate to edit page 
   * @param event 
   */
  editMedicines(event: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        editMedicinesData: JSON.stringify(event)
      },
      skipLocationChange: true
    };
    this.router.navigate(['admin/dashboard/editMedicine'], navigationExtras);
  }
  /**
 * Method to get Patient list
 */
  getMedicinesList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.medicineService.getMedicinesList('')
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
      const respObj = new medicine();
      respObj.medicineId = row.MedicineId;
      respObj.medicineCode = row.MedicineCode;
      respObj.name = row.Name;
      respObj.company = row.Company;
      respObj.composition = row.Composition;
      respObj.expiryDate = row.ExpiryDate;
      respObj.dosage = row.Dosage;
      respObj.type = row.Type;
      respObj.cost = row.Cost;
      respObj.availabelQuantity = row.AvailableQuantity;
      respObj.description = row.Description;
      respObjLst.push(respObj);
    }
    this.dataSource = respObjLst;
  }


  /**
   * Method to delete existing Patient
   * @param event 
   */
  deleteMedicines(event: any) {
    this.showDeleteAppointmentDialog(event);
  }

  /**
  * Method to show delete confirmation dialog
  * @param data 
  */
  showDeleteAppointmentDialog(data: any) {
    const message = Messages.Dialog_Confirmation_Delete_Message;

    const dialogData = {
      title: "Delete Medicines",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.callDeleteMedicineApi(data);
      }
    });

  }

  /**
  * Method to called delete Patient api
  * @param respData 
  */
  callDeleteMedicineApi(respData: any) {
    this.isDataLoading = true;
    this.medicineService.deleteMedicinesList(respData.medicineId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteMedicineSuccess);
            this.getMedicinesList();
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
    this.router.navigate(["admin/dashboard/addMedicine"]);
  }

}
