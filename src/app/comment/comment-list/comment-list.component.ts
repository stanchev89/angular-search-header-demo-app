import { Component } from '@angular/core';
import { ISearchInputProps } from '../../shared/interfaces/searchInputProps';
import { JsonPlaceholderService } from '../../core/services/json-placeholder.service';
import { generateSearchInputProps } from '../../core/utils/generateSearchInputProps';
import { IListResponse } from '../../shared/interfaces/listResponse';
import { commentSearchKeys, IComment } from '../../shared/interfaces/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  searchProps: ISearchInputProps[] = [];
  data: IComment[] = [];
  dataTotalCount = 0;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {}

  request$ = this.jsonPlaceholderService.getComments.bind(this.jsonPlaceholderService);

  ngOnInit() {
    this.searchProps = generateSearchInputProps<IComment>({
      keys: commentSearchKeys,
      numberKeys: ['id', 'postId'],
    });
  }

  onDataUpdate(data: IListResponse<IComment>): void {
    this.dataTotalCount = data.totalCount;
    this.data = data.list;
  }
}
