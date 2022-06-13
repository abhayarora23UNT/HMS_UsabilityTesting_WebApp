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
