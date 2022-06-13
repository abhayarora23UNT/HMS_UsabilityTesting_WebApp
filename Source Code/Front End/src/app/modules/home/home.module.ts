import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeScreenComponent } from './home-screen/home-screen.component';



@NgModule({
  declarations: [
    HomeScreenComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class HomeModule { }
