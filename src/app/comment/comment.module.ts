import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsRouterModule } from './comment-router.module';



@NgModule({
  declarations: [
    CommentListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommentsRouterModule
  ]
})
export class CommentModule { }
