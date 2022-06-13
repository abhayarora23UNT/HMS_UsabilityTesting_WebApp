import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AddPatientAppointmentComponent } from "./appointment/add-patient-appointment/add-appointment.component";
import { EditPatientAppointmentComponent } from "./appointment/edit-patient-appointment/edit-appointment.component";
import { ListPatientAppointmentComponent } from "./appointment/list-patient-appointment/list-appointment.component";
import { ListAppointmentMedicinesComponent } from "./list-appointment-medicines/list-appointment-medicines.component";
import { ListPatientDoctorsComponent } from "./list-patient-doctors/list-patient-doctors.component";
import { ListTreatmentMedicinesComponent } from "./list-treatment-medicines/list-treatment-medicines.component";
import { PatientDashboardComponent } from "./patient-dashboard/patient-dashboard.component";
import { PatientHomeComponent } from "./patient-home/patient-home.component";
import { PatientRoutingModule } from './patient-routing.module';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    ListPatientDoctorsComponent,
    ListTreatmentMedicinesComponent,
    ListAppointmentMedicinesComponent,
    PatientHomeComponent,
    AddPatientAppointmentComponent,
    ListPatientAppointmentComponent,
    EditPatientAppointmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientModule { }
