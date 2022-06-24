import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageProvider } from '../http/storage-service';
import { Location } from '@angular/common';
import { PublishEventService } from '../services/utils/publish-event.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

declare var window: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  dialogRefConnectionTimeout: any;
  private onDestroy$: Subject<void> = new Subject<void>();





  showLinksBox = false;
  isLoading = false;
  isProdEnv = false;
  userName = null;
  userRole = null;
  showUserDetails = false;
  private subscriptionRoute!: Subscription;
  constructor(private router: Router, private location: Location, private storageService: StorageProvider, private eventService: PublishEventService, public dialog: MatDialog) {

  }

  /**
   * Desc: Method called on page initialization.
   */
  ngOnInit() {
    this.subscriptionRoute = this.eventService
      .getData()
      .subscribe(data => {
        console.log(data);
        if (data == '/login' || data == '/authentication/register' || data == '/authentication/login') {
          this.showUserDetails = false;
          this.userName = null;
          this.userRole = null;
        } else {
          this.showUserDetails = true;
          this.userName = this.storageService.getSessionStorageData('userName');
          this.userRole = this.storageService.getSessionStorageData('userRole');
        }
      })

  }

  /**
   * Desc:Method called on page destroy.
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.subscriptionRoute.unsubscribe();

  }

  appLogoutConfirm() {
    const message = `Do you want to logout?`;

    const dialogData = {
      title: "Confirm",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.router.navigate(['login']).then((data) => {
          if (data) {
            this.storageService.removeKeys('userName');
            this.storageService.removeKeys('userRole');
          }
        });
      }
    });

  }

  /**
   * Method to navigate to home screen
   */
  setDashboardNav() {
    let routerPath = '';
    if (this.userRole) {
      const roleType: any = this.userRole;
      switch (roleType) {
        case 'Admin':
          routerPath = 'admin/dashboard/home';
          break
        case 'Doctor':
          routerPath = 'doctor/dashboard/home';
          break
        case 'Patient':
          routerPath = 'patient/dashboard/home';
          break
        case 'Staff':
          routerPath = 'staff/dashboard/home';
          break
        default:
          routerPath = 'admin/dashboard/home';
      }
      this.router.navigate([routerPath]);
    }
  }

}
