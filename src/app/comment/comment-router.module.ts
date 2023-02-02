import { RouterModule, Routes } from '@angular/router';
import { CommentListComponent } from './comment-list/comment-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/comments/list'
  },
  {
    path: 'list',
    component: CommentListComponent
  }
];

export const CommentsRouterModule = RouterModule.forChild(routes);
