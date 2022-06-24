import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from 'src/app/core/authentication/auth-guard.service';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffListPatientAppointmentsComponent } from './staff-list-patient-appointments/staff-list-patient-appointments.component';
import { StaffListPatientMedicinesComponent } from './staff-list-patient-medicines/staff-list-patient-medicines.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: StaffDashboardComponent,
    children: [

      {
        path: '', pathMatch: 'full', redirectTo: 'home'
      },
      {
        path: 'home',
        component: StaffHomeComponent,
      },
      {
        path: 'addPatient',
        canDeactivate: [NavigationGuard],
        component: AddPatientComponent,
      },
      {
        path: 'editPatient',
        component: EditPatientComponent,
      },
      {
        path: 'listPatient',
        component: ListPatientComponent,
      },

      {
        path: 'listPatientDoctors',
        component: ListDoctorsComponent,
      },

      {
        path: 'listPatientMedicine',
        component: StaffListPatientMedicinesComponent,
      },

      {
        path: 'listPatientAppointment',
        component: StaffListPatientAppointmentsComponent,
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
