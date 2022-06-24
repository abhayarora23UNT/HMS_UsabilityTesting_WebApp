import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AboutUsComponent } from 'src/app/shared/components/about-us/about-us.component';
import { HospServicesComponent } from 'src/app/shared/components/hosp-services/hosp-services.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  opened = true;
  constructor(public dialog: MatDialog) {  }

  ngOnInit(): void {
  }

  
  /**
   * Method to open services modal
   */
   openServicesModal(){
    const dialogRef = this.dialog.open(HospServicesComponent, {
      maxWidth: "85%",
      maxHeight:"85%"
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        
      }
    });
  }

  /**
   * Method to open About Us Modal
   */
  openAboutUsModal(){
    const dialogRef = this.dialog.open(AboutUsComponent, {
      maxWidth: "85%",
      maxHeight:"85%"
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        
      }
    });
  }
}
