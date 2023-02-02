import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserRoutingModule} from "./user-routing.module";
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
