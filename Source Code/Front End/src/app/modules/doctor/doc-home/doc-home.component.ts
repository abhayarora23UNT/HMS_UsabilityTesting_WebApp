import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-home',
  templateUrl: './doc-home.component.html',
  styleUrls: ['./doc-home.component.scss']
})
export class DocHomeComponent implements OnInit {

  dashboardRecordsList: any = [];
  constructor() { }

  ngOnInit(): void {
    this.dashboardRecordsList = this.getRecordsList();
  }

  
  getRecordsList() {
    const dataList: any = [
     
      
      {
        "icon": "person",
        // "count": 2,
        "title": "Patients",
        "color": "green"
      },
    
      {
        "icon": "access_time",
        // "count": 8,
        "title": "Active Appointments",
        "color": "green"
      },
      {
        "icon": "timelapse",
        // "count": 5,
        "title": "Pending Appointments",
        "color": "black"
      },
      {
        "icon": "medication",
        // "count": 6,
        "title": "Medicines",
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
