import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationGuard } from 'src/app/core/authentication/auth-guard.service';
import { AddTreatmentComponent } from '../admin/treatment/add-treatment/add-treatment.component';
import { ListTreatmentComponent } from '../admin/treatment/list-treatment/list-treatment.component';
import { AddAppointmentMedicineComponent } from './appointment-medicine/add-appointment-medicine/add-appointment-medicine.component';
import { EditAppointmentMedicineComponent } from './appointment-medicine/edit-appointment-medicine/edit-appointment-medicine.component';
import { ListAppointmentMedicineComponent } from './appointment-medicine/list-appointment-medicine/list-appointment-medicine.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './appointment/edit-appointment/edit-appointment.component';
import { ListAppointmentComponent } from './appointment/list-appointment/list-appointment.component';
import { DocDashboardComponent } from './doc-dashboard/doc-dashboard.component';
import { DocHomeComponent } from './doc-home/doc-home.component';
import { AddTreatmentMedicineComponent } from './treatment/add-treatment/add-treatment.component';
import { EditTreatmentMedicineComponent } from './treatment/edit-treatment/edit-treatment.component';
import { ListTreatmentMedicineComponent } from './treatment/list-treatment/list-treatment.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DocDashboardComponent,
    children: [

      {
        path: '', pathMatch: 'full', redirectTo: 'home'
      },
      {
        path: 'home',
        component: DocHomeComponent,
      },
      {
        path: 'addAppointment',
        canDeactivate: [NavigationGuard],
        component: AddAppointmentComponent,
      },
      {
        path: 'editAppointment',
        component: EditAppointmentComponent,
      },
      {
        path: 'listAppointment',
        component: ListAppointmentComponent,
      },

      {
        path: 'addTreatmentMedicine',
        canDeactivate: [NavigationGuard],
        component: AddTreatmentMedicineComponent,
      },
      {
        path: 'listTreatmentMedicine',
        component: ListTreatmentMedicineComponent,
      },
      {
        path: 'editTreatmentMedicine',
        component: EditTreatmentMedicineComponent,
      },
      {
        path: 'addAppointmentMedicine',
        canDeactivate: [NavigationGuard],
        component: AddAppointmentMedicineComponent,
      },
      {
        path: 'listAppointmentMedicine',
        component: ListAppointmentMedicineComponent,
      },
      {
        path: 'editAppointmentMedicine',
        component: EditAppointmentMedicineComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
