import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';



const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home' 
  },
  {
    path: 'home',
    component: HomeScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
