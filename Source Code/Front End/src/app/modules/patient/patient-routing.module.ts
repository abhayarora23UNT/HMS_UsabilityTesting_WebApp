import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from 'src/app/core/authentication/auth-guard.service';
import { AddPatientAppointmentComponent } from './appointment/add-patient-appointment/add-appointment.component';
import { EditPatientAppointmentComponent } from './appointment/edit-patient-appointment/edit-appointment.component';
import { ListPatientAppointmentComponent } from './appointment/list-patient-appointment/list-appointment.component';
import { ListAppointmentMedicinesComponent } from './list-appointment-medicines/list-appointment-medicines.component';
import { ListPatientDoctorsComponent } from './list-patient-doctors/list-patient-doctors.component';
import { ListTreatmentMedicinesComponent } from './list-treatment-medicines/list-treatment-medicines.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: PatientDashboardComponent,
    children: [

      {
        path: '', pathMatch: 'full', redirectTo: 'home'
      },
      {
        path: 'home',
        component: PatientHomeComponent,
      },
      {
        path: 'addPatientAppointment',
        canDeactivate: [NavigationGuard],
        component: AddPatientAppointmentComponent,
      },
      {
        path: 'editPatientAppointment',
        canDeactivate: [NavigationGuard],
        component: EditPatientAppointmentComponent,
      },
      {
        path: 'listPatientAppointment',
        component: ListPatientAppointmentComponent,
      },

      {
        path: 'listPatientDoctors',
        component: ListPatientDoctorsComponent,
      },
     
      {
        path: 'listTreatmentMedicine',
        component: ListTreatmentMedicinesComponent,
      },
     
      {
        path: 'listAppointmentMedicine',
        component: ListAppointmentMedicinesComponent,
      },
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
