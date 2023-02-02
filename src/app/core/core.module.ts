import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonPlaceholderService} from "./services/json-placeholder.service";
import {SharedModule} from "../shared/shared.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidebarItemComponent } from './components/sidebar/sidebar-item/sidebar-item.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

const MATERIAL_IMPORTS = [
  MatSidenavModule,
]

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...MATERIAL_IMPORTS,
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  exports: [
    SidebarComponent,
    ...MATERIAL_IMPORTS
  ],
  providers: [
    JsonPlaceholderService,
  ]
})
export class CoreModule { }
