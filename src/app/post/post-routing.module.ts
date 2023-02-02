import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/posts/list'
  },
  {
    path: 'list',
    component: PostListComponent
  }
];

export const PostRoutingModule = RouterModule.forChild(routes);
