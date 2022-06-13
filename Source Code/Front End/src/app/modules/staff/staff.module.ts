import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ListDoctorsComponent } from "./list-doctors/list-doctors.component";
import { AddPatientComponent } from "./patient/add-patient/add-patient.component";
import { EditPatientComponent } from "./patient/edit-patient/edit-patient.component";
import { ListPatientComponent } from "./patient/list-patient/list-patient.component";
import { StaffDashboardComponent } from "./staff-dashboard/staff-dashboard.component";
import { StaffHomeComponent } from "./staff-home/staff-home.component";
import { StaffListPatientAppointmentsComponent } from "./staff-list-patient-appointments/staff-list-patient-appointments.component";
import { StaffListPatientMedicinesComponent } from "./staff-list-patient-medicines/staff-list-patient-medicines.component";

import { StaffRoutingModule } from './staff-routing.module';



@NgModule({
  declarations: [
    StaffDashboardComponent,
    StaffHomeComponent,
    StaffListPatientAppointmentsComponent,
    StaffListPatientMedicinesComponent,
    AddPatientComponent,
    ListPatientComponent,
    EditPatientComponent,
    ListDoctorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StaffRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StaffModule { }
