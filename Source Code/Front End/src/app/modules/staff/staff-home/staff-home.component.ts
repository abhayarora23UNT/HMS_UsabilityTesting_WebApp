import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss']
})
export class StaffHomeComponent implements OnInit {

 
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
        "title": "Pending Treatments",
        "color": "red"
      },
      {
        "icon": "medication",
        // "count": 5,
        "title": "Appointment Medicines",
        "color": "blue"
      },
      {
        "icon": "medication",
        // "count": 2,
        "title": "Treatment Medicines",
        "color": "green"
      },
      {
        "icon": "medication",
        // "count": 6,
        "title": "Medicines",
        "color": "black"
      },

      {
        "icon": "access_time",
        // "count": 6,
        "title": "Active Appointments",
        "color": "black"
      },
     
      {
        "icon": "timelapse",
        // "count": 8,
        "title": "Pending Appointments",
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
