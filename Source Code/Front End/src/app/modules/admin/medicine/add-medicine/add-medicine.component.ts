import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants, ModuleConstants } from 'src/app/core/constants/constants';
import { Messages } from 'src/app/core/messages/messages';
import {AdminMedicineService } from 'src/app/core/services/admin/admin-medicine.service';
import { LookupService } from 'src/app/core/services/lookups/lookups.service';
import { CommonUtilsService } from 'src/app/core/services/utils/common-utils.service';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit , OnDestroy{

  AddMedicines!: FormGroup;
  isDataLoading = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private medicineService: AdminMedicineService, private toastService: ToastMessageService,
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
  this.AddMedicines = this.formBuilder.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    composition: ['', Validators.required],
    dosage:['', Validators.required],
    expiryDate:['', Validators.required],
    type:['', Validators.required],
    description:['', Validators.required],
    cost:['', Validators.required],
    availabelQuantity:['', Validators.required],
    
  });
  }

  createMedicine(){
    if (this.AddMedicines.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const fgValue = JSON.parse(JSON.stringify(this.AddMedicines.value));
      console.log('data is  ' + fgValue);
      fgValue.type = +fgValue.type;
      fgValue.cost = +fgValue.cost;
      fgValue.expiryDate = this.commonUtilsService.convertDateStringToYyyyMmDd(fgValue.expiryDate);
      this.callCreateMedicineApi(fgValue);
    }
    }

    /**
    * Method to called create appointment api
    * @param respData 
    */
    callCreateMedicineApi(respData: any) {
    this.isDataLoading = true;
    this.medicineService.createMedicinesList(respData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          this.isDataLoading = false;
          if (retData.status) {
            this.toastService.successMessage(Messages.CreateMedicineSuccess);
            this.AddMedicines.markAsPristine();
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

    /**
   * Method to navigate to medicine list screen
   */
     navigateToMedicineScreen() {
      this.router.navigate(['admin/dashboard/listMedicine']);
    }

}
