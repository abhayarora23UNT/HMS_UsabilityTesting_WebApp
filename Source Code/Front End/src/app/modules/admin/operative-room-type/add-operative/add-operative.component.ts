import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminOperativeRoomService } from 'src/app/core/services/admin/admin-operative-room.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-add-operative',
  templateUrl: './add-operative.component.html',
  styleUrls: ['./add-operative.component.scss']
})
export class AddOperativeComponent implements OnInit,OnDestroy {
  fgAddOperative!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private operativeService: AdminOperativeRoomService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService) {
    this.createFormGroup();

}  

ngOnInit(): void {
    
  }
  /**
   * Method called on page destroy
   */
 ngOnDestroy(): void {
  this.onDestroy$.next();
}

createFormGroup() {
this.fgAddOperative = this.formBuilder.group({
  roomTypeId: ['', Validators.required],
  roomNo: ['', Validators.required],
  bedNo: ['', Validators.required],
  startDate: ['', Validators.required], 
  endDate: ['', Validators.required],
  
});
}
createOperative(){
if (this.fgAddOperative.status == Constants.FormInvalid) {
  this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
} else {
  const fgValue = JSON.parse(JSON.stringify(this.fgAddOperative.value));
  fgValue.startDate = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.startDate);
  fgValue.endDate = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.endDate);
  console.log('data is  ' + fgValue);
  this.callCreateOperativeApi(fgValue);
}
}

/**
* Method to called create appointment api
* @param respData 
*/
callCreateOperativeApi(respData: any) {
this.isDataLoading = true;
this.operativeService.createOperativeRoomList(respData)
  .pipe(takeUntil(this.onDestroy$))
  .subscribe({
    next: (retData: any) => {
      this.isDataLoading = false;
      if (retData.status) {
        this.toastService.successMessage(Messages.CreateOperativeSuccess);
        this.fgAddOperative.markAsPristine();
        this.navigateToOperativeScreen();
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


navigateToOperativeScreen() {
this.router.navigate(['admin/dashboard/listOperativeRoom']);
}
}

