import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Messages } from '../messages/messages';

@Injectable({
    providedIn: 'root'
})
export class NavigationGuard implements CanDeactivate<any> {

    constructor(public dialog: MatDialog) { }
    canDeactivate(component: any): Promise<boolean> | boolean {
        if (component.fgAddAppointment !== undefined && component.fgAddAppointment !== null && component.fgAddAppointment.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgEditAppointment !== undefined && component.fgEditAppointment !== null && component.fgEditAppointment.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddTreatment !== undefined && component.fgAddTreatment !== null && component.fgAddTreatment.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddPatient !== undefined && component.fgAddPatient !== null && component.fgAddPatient.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddDoctor !== undefined && component.fgAddDoctor !== null && component.fgAddDoctor.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddSpecialization !== undefined && component.fgAddSpecialization !== null && component.fgAddSpecialization.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.AddTreatment !== undefined && component.AddTreatment !== null && component.AddTreatment.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddHospitalBranch !== undefined && component.fgAddHospitalBranch !== null && component.fgAddHospitalBranch.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddAppointmentMedicine !== undefined && component.fgAddAppointmentMedicine !== null && component.fgAddAppointmentMedicine.dirty) {
            return this.showUnsavedChangesDialog();
        } else if (component.fgAddTreatmentMedicine !== undefined && component.fgAddTreatmentMedicine !== null && component.fgAddTreatmentMedicine.dirty) {
            return this.showUnsavedChangesDialog();
        } else {
            return true;
        }
    }

    /**
     * Method to show unsaved changes dialog
     * @returns 
     */
    showUnsavedChangesDialog() {

        return new Promise<boolean>(resolve => {
            const dialogData = {
                title: "Confirm",
                message: Messages.Unsaved_Changes_Confirmation
            };

            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

}
