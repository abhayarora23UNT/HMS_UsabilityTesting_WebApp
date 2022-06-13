import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras,Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { StaffDoctorService } from 'src/app/core/services/staff/staff-doctor.service';
import { Doctor } from 'src/app/shared/models/doctor/doctor-resp-data';
import { Messages } from 'src/app/core/messages/messages';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-staff-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit {

  appointmentColumns: string[] = ['name', 'designation', 'phone', 'gender', 'email'];
  isDataLoading = false; // flag to hide/show loader
  dataSource: any = []; 
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private router: Router, private doctorService: StaffDoctorService, private lookupService: LookupService, private toastService: ToastMessageService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDoctorsList();
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
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