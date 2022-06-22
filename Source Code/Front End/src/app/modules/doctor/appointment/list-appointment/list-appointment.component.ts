import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Messages } from 'src/app/core/messages/messages';
import { DoctorAppointmentService } from 'src/app/core/services/doctor/doctor-apppointment.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DoctorAppointment } from 'src/app/shared/models/doctor/doctor-appointment-resp-data';

@Component({
  selector: 'app-doc-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss']
})
export class ListAppointmentComponent implements OnInit, OnDestroy {

  hospitalIdList: any = []; // dropdown list for hospital Id
  doctorIdList: any = [];   // dropdown list for doctor Id
  patientIdList: any = [];  // dropdown list for patient Id

  appointmentColumns: string[] = ['doctorId', 'doctorName','patientId','patientName','hospitalName', 'appt_Date', 'fee', 'action'];  // table columns
  isDataLoading = false; // flag to hide/show loader
  private onDestroy$: Subject<void> = new Subject<void>();
  dataSource: any = [];
  constructor(private doctorService: DoctorAppointmentService,private lookupService: LookupService, private toastService: ToastMessageService, private router: Router, private dialog: MatDialog) {

  }

  /**
   * Method called on page init
   */
  ngOnInit(): void {
    this.getHospitalBranchList();
    this.getDoctorsList();
    this.getPatientsList();

    setTimeout(() => {
      this.getDocAppointmentList();
    }, 1000);
    
  }

  /**
   * Method called on page destroy
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method to get appointment list
   */
  getDocAppointmentList() {
    this.isDataLoading = true;
    this.dataSource = [];
    this.doctorService.getDocAppointmentList('')
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

  getHospitalBranchList() {
    this.lookupService.getHospitalBranchList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.hospitalIdList = retData.data.Table;
          }
          else {
            this.toastService.infoMessage(Messages.No_Records_Message);
          }
        } else {
          this.toastService.errorMessage(retData.message);
        }
      });
  }

  /**
   * Function called to get doctors List
   */
  getDoctorsList() {
    this.lookupService.getDoctorsList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.doctorIdList = retData.data.Table;
          }
          else {
            this.toastService.infoMessage(Messages.No_Records_Message);
          }
        } else {
          this.toastService.errorMessage(retData.message);
        }
      });
  }

  /**
   * Function called to get patient List
   */
  getPatientsList() {
    this.lookupService.getPatientsList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((retData: any) => {
        if (retData.status) {
          if (retData.data.Table != null && retData.data.Table.length > 0) {
            this.patientIdList = retData.data.Table;
          }
          else {
            this.toastService.infoMessage(Messages.No_Records_Message);
          }
        } else {
          this.toastService.errorMessage(retData.message);
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
      const respObj = new DoctorAppointment();
      respObj.appointmentCode = row.AppointmentCode;
      respObj.appointmentId = row.AppointmentId;
      respObj.appt_Date = row.Appt_Date;
      respObj.doctorId = row.DoctorId;
      respObj.doctorName = this.getDoctorName(row.DoctorId);
      respObj.patientName = this.getPatientName(row.PatientId);
      respObj.hospitalName = this.getHospitalName(row.HospitalId);
      respObj.fee = row.Fee;
      respObj.diseaseNotes = row.DiseaseNotes;
      respObj.hospitalId = row.HospitalId;
      respObj.next_Appt_Date = row.Next_Appt_Date;
      respObj.patientId = row.PatientId;
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
        appointmentData: JSON.stringify(event),
      },
      skipLocationChange:true
    };
    this.router.navigate(['doctor/dashboard/editAppointment'], navigationExtras);
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
      title: "Delete Appointment",
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
    * Method to get doctor name from id
    * @param doctorId 
    */
  getDoctorName(doctorId:any){
    for(const row of this.doctorIdList){
      if(row.DoctorId == doctorId)
      return row.Name;
    }
    return "";
  }

  /**
    * Method to get patient name from id
    * @param patientId 
    */
  getPatientName(patientId:any){
    for(const row of this.patientIdList){
      if(row.PatientId == patientId)
      return row.Name;
    }
    return "";
  }

  /**
    * Method to get hospital name from id
    * @param hospitalId 
    */
  getHospitalName(hospitalId:any){
    for(const row of this.hospitalIdList){
      if(row.HospitalId == hospitalId)
      return row.Name;
    }
    return "";
  }

  /**
    * Method to called delete appointment api
    * @param respData 
    */
  callDeleteAppointmentApi(respData: any) {
    this.isDataLoading = true;
    this.doctorService.deleteDocAppointment(respData.appointmentId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.DeleteDocAppointmentSuccess);
            this.getDocAppointmentList();
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
    this.router.navigate(["doctor/dashboard/addAppointment"]);
  }

}
