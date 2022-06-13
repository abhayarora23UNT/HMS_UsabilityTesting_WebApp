import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import {AdminMedicineService} from 'src/app/core/services/admin/admin-medicine.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.scss']
})
export class EditMedicineComponent implements OnInit {
  EditMedicines!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  editMedicinesData: any;
  constructor(private formBuilder: FormBuilder, private medicineService: AdminMedicineService, private toastService: ToastMessageService,
    private router: Router, private lookupService: LookupService, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute) {
    this.createFormGroup();

    // get existing appointment data from routing params //
    this.route.queryParams.subscribe(params => {
      if (params && params['editMedicinesData']) {
        this.editMedicinesData = JSON.parse(params['editMedicinesData']);
      }
    });

  }

  ngOnInit(): void {
    this.bindFormData(this.editMedicinesData);
  }

  createFormGroup() {
    this.EditMedicines = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      composition: ['', Validators.required],
      dosage:['', Validators.required],
      expiryDate:['', Validators.required],
      type:['', Validators.required],
      description:['', Validators.required],
      cost:['', Validators.required],
      availabelQuantity:['', Validators.required],
      medicineId: [''],
      medicineCode:[''],
      
    });
    }

     /**
 * Method to bind form data
 * @param formData 
 */
  bindFormData(formData: any) {
    if (formData) {
      this.EditMedicines.patchValue(this.editMedicinesData);
    }
  }

  navigateToMedicineScreen() {
    this.router.navigate(['admin/dashboard/listMedicine']);
  }

  editMedicines() {
    if (this.EditMedicines.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.EditMedicines.value));
      // fgValue.type = +fgValue.type;
      fgValue.cost = +fgValue.cost;
      fgValue.expiryDate = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.expiryDate);
      console.log('data is  ' + fgValue);
      this.callMedicineApi(fgValue);
    }
  }

  /**
* Method to called update appointment api
* @param respData 
*/
callMedicineApi(respData: any) {
    this.isDataLoading = true;
    this.medicineService.editMedicinesList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.UpdateMedicineSuccess);
            this.EditMedicines.markAsPristine();
            this.navigateToMedicineScreen();
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
