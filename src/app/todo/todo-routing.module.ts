import {Route, RouterModule} from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/todos/list'
  },
  {
    path: 'list',
    component: TodoListComponent
  }
];

export const TodoRoutingModule = RouterModule.forChild(routes);
