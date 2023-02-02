import { Component, OnInit } from '@angular/core';
import { ISearchInputProps } from '../../shared/interfaces/searchInputProps';
import { generateSearchInputProps } from '../../core/utils/generateSearchInputProps';
import { ITodo, todoSearchKeys } from '../../shared/interfaces/todo';
import { IListResponse } from '../../shared/interfaces/listResponse';
import { JsonPlaceholderService } from '../../core/services/json-placeholder.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  searchProps: ISearchInputProps[] = [];
  data: ITodo[] = [];
  dataTotalCount = 0;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {
  }

  request$ = this.jsonPlaceholderService.getTodos.bind(this.jsonPlaceholderService);

  ngOnInit() {
    this.searchProps = generateSearchInputProps<ITodo>({
      keys: todoSearchKeys,
      numberKeys: ['id', 'userId'],
      select: {
        completed: {
          list: [true.toString(), false.toString()],
          getLabel: v => v,
          getValue: v => v,
        }
      }
    });
  }

  onDataUpdate(data: IListResponse<ITodo>): void {
    this.dataTotalCount = data.totalCount;
    this.data = data.list;
  }
}
