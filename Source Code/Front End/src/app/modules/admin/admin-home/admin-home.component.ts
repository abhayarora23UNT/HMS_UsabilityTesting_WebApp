import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  dashboardRecordsList: any = [];
 
  constructor() { }

  ngOnInit(): void {
    this.dashboardRecordsList = this.getRecordsList();
  }

  
  getRecordsList() {
    const dataList: any = [
      {
        "icon": "folder_special",
        // "count": 10,
        "title": "Specializations",
        "color": "#DC3220"
      },
      {
        "icon": "supervisor_account",
        // "count": 5,
        "title": "Doctors",
        "color": "#005AB5"
      },
      {
        "icon": "person",
        // "count": 2,
        "title": "Patients",
        "color": "#40B0A6"
      },
      {
        "icon": "local_hospital",
        // "count": 6,
        "title": "Hospital Branches",
        "color": "black"
      },

      {
        "icon": "medication",
        // "count": 6,
        "title": "Medicines",
        "color": "black"
      },
     
      {
        "icon": "people_outline",
        // "count": 8,
        "title": "Staff",
        "color": "black"
      },

    ];

    return dataList;
  }

  getStyleColor(index: any) {
    // console.log(index);
    return this.dashboardRecordsList[index].color;
  }

}
