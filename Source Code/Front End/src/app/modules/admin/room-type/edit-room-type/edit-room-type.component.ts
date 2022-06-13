import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import { AdminRoomTypeService } from 'src/app/core/services/admin/admin-room-type.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-edit-room-type',
  templateUrl: './edit-room-type.component.html',
  styleUrls: ['./edit-room-type.component.scss']
})
export class EditRoomTypeComponent implements OnInit,OnDestroy {

  fgEditRoomType!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  editRoomTypeData: any;
  constructor(private formBuilder: FormBuilder, private roomTypeService: AdminRoomTypeService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing room type data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['editRoomTypeData']) {
        this.editRoomTypeData = JSON.parse(params['editRoomTypeData']);
      }
    });

  }

  ngOnInit(): void {
    this.bindFormData(this.editRoomTypeData);
  }
  /**
   * Method called on page destroy
   */
   ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
   * Method to bind form data
   * @param formData 
   */
   bindFormData(formData: any) {
    if (formData) {
      this.fgEditRoomType.patchValue(this.editRoomTypeData);
    }
  }
  createFormGroup() {
    this.fgEditRoomType = this.formBuilder.group({
      roomTypeId: [''],
      name: ['', Validators.required],
      description:['']

    });
  }

  navigateToRoomTypeScreen() {
    this.router.navigate(['admin/dashboard/listRoomType']);
  }

  editRoomType() {
    if (this.fgEditRoomType.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.fgEditRoomType.value));
      console.log('data is  ' + fgValue);
      this.callRoomTypeApi(fgValue);
    }
  }

    /**
    * Method to called update room type api
    * @param respData 
    */
     callRoomTypeApi(respData: any) {
      this.isDataLoading = true;
      this.roomTypeService.editRoomTypeList(respData)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (retData: any) => {
            this.isDataLoading = false;
            if (retData.status) {
              this.toastService.successMessage(Messages.UpdateRoomSuccess);
              this.fgEditRoomType.markAsPristine();
              this.navigateToRoomTypeScreen();
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
