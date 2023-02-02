import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataListComponent } from './components/data-list/data-list.component';
import { ResolveDirective } from './directives/resolve.directive';
import { DataListItemComponent } from './components/data-list/data-list-item/data-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SearchHeaderComponent,
    PaginationComponent,
    DataListComponent,
    ResolveDirective,
    DataListItemComponent,
    LoaderComponent,
  ],
  exports: [
    SearchHeaderComponent,
    PaginationComponent,
    ResolveDirective,
    DataListComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
