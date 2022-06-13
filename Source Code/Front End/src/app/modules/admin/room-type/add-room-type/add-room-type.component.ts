import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminRoomTypeService } from 'src/app/core/services/admin/admin-room-type.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.scss']
})
export class AddRoomTypeComponent implements OnInit,OnDestroy {

  fgAddRoomType!: FormGroup;
  isDataLoading = false
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private roomTypeService: AdminRoomTypeService, private toastService: ToastMessageService,
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
      this.fgAddRoomType = this.formBuilder.group({
        name: ['', Validators.required],
        description:['']
  
      });
    }
    navigateToListRoomTypeScreen() {
      this.router.navigate(['admin/dashboard/listRoomType']);
    }

    createRoomType(){
      if (this.fgAddRoomType.status == Constants.FormInvalid) {
        this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
      } else {
        const fgValue = JSON.parse(JSON.stringify(this.fgAddRoomType.value));
        console.log('data is  ' + fgValue);
        this.callCreateRoomTypeApi(fgValue);
      }
    }

    /**
    * Method to called create room type api
    * @param respData 
    */
     callCreateRoomTypeApi(respData: any) {
      this.isDataLoading = true;
      this.roomTypeService.createRoomTypeList(respData)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.CreateRoomSuccess);
              this.fgAddRoomType.markAsPristine();
              this.navigateToListRoomTypeScreen();
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

}
  


