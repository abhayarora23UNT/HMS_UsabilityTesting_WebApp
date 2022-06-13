import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageProvider } from 'src/app/core/http/storage-service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  constructor(private storageService: StorageProvider, private router: Router) { }
  
  userName=null;
  userRole=null;
  isServicsTabVisible = false;
  ngOnInit(): void {
    this.userName=this.storageService.getSessionStorageData('userName');
    this.userRole=this.storageService.getSessionStorageData('userRole');
  }


  showServicesTab() {
    console.log('inside services tab');
    this.isServicsTabVisible = !this.isServicsTabVisible;
  }

  appLogoutConfirm() {
    if (window.confirm('Do you want to logout?')) {
      this.storageService.removeKeys('userName');
      this.storageService.removeKeys('userRole');
      this.router.navigate(['login']);
    }
  }

}
