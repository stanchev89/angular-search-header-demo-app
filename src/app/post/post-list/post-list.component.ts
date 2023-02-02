import { Component } from '@angular/core';
import { ISearchInputProps } from '../../shared/interfaces/searchInputProps';
import { JsonPlaceholderService } from '../../core/services/json-placeholder.service';
import { generateSearchInputProps } from '../../core/utils/generateSearchInputProps';
import { IListResponse } from '../../shared/interfaces/listResponse';
import { IPost, postSearchKeys } from '../../shared/interfaces/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  searchProps: ISearchInputProps[] = [];
  data: IPost[] = [];
  dataTotalCount = 0;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {
  }

  request$ = this.jsonPlaceholderService.getPosts.bind(this.jsonPlaceholderService);

  ngOnInit() {
    this.searchProps = generateSearchInputProps<IPost>({
      keys: postSearchKeys,
      numberKeys: ['id'],
    });
  }

  onDataUpdate(data: IListResponse<IPost>): void {
    this.dataTotalCount = data.totalCount;
    this.data = data.list;
  }
}
