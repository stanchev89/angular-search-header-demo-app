import {Route, RouterModule} from "@angular/router";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users/list'
  },
  {
    path: 'list',
    component: UserListComponent
  }
];
export const UserRoutingModule = RouterModule.forChild(routes);
